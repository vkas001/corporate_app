import type { CreateProducerInput } from "@/components/forms/ProducerForm";
import type { CreateSellerInput } from "@/components/forms/SellerForm";
import api from "@/services/api";
import type { UserRole } from "@/types/user";
import type {
    CreateUserPayload,
    CreateUserRequestBody,
    UpdateUserByIdInput,
    User,
} from "@/types/userService";
import { getAuth, type AuthUser } from "@/utils/auth";

export type {
    CreateUserPayload,
    CreateUserRequestBody,
    UpdateUserByIdInput,
    User
} from "@/types/userService";

export const getUserProfile = async (): Promise<User> => {
    const res = await api.get("/user");
    return res.data;
};

export const getCurrentUser = async (): Promise<User | null> => {
    const auth = await getAuth();
    return (auth?.user as AuthUser) ?? null;
};

export const updateUserProfile = async (updates: Partial<User>): Promise<User> => {
    const res = await api.put("/user/profile", updates);
    return res.data;
};

export const updateUserAvatar = async (base64Image: string) => {
    const res = await api.post('/user/photo', {
        photo: base64Image,
    });

    return res.data;
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.post("/user/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
    });
};

export const getUserById = async (userId: string): Promise<User> => {
    const res = await api.get(`/users/${userId}`);
    const body = res.data;
    const raw = body?.data ?? body?.user ?? body;
    return normalizeUser(raw);
};

const normalizeRole = (input: unknown): UserRole => {
    const raw = typeof input === "string" ? input : "";
    const v = raw.trim().toLowerCase();

    if (v.includes("super")) return "superAdmin";
    if (v.includes("admin")) return "admin";
    if (v.includes("producer")) return "producer";
    if (v.includes("seller")) return "seller";
    return "seller";
};

const toApiRoleSlug = (role: string | undefined): string | undefined => {
    if (!role) return undefined;

    const v = role.trim().toLowerCase();
    if (!v) return undefined;

    if (v.includes("producer")) return "producer";
    if (v.includes("seller")) return "seller";
    if (v.includes("super")) return "admin";
    if (v.includes("admin")) return "admin";

    return v;
};

const normalizeUser = (u: any): User => {
    const roleFromTopLevel = normalizeRole(u?.role);
    const roleFromRolesArray = Array.isArray(u?.roles)
        ? normalizeRole(u.roles[0])
        : roleFromTopLevel;

    const name = u?.name ?? u?.full_name ?? u?.fullName ?? u?.username ?? u?.user_name ?? null;
    const email = u?.email ?? u?.user_email ?? u?.mail ?? "";

    return {
        id: u?.id ?? u?.user_id ?? "",
        email,
        name,
        role: roleFromRolesArray,
        roles: Array.isArray(u?.roles) ? u.roles : undefined,
        permissions: Array.isArray(u?.permissions) ? u.permissions : undefined,
        status: typeof u?.status === "boolean" ? u.status : undefined,
        photo: u?.photo ?? u?.avatar ?? null,
        phone: u?.phone ?? null,
        address: u?.address ?? null,
        createdAt: u?.createdAt ?? u?.created_at,
        updatedAt: u?.updatedAt ?? u?.updated_at,
    };
};

export const updateUserById = async (
    userId: string,
    updates: UpdateUserByIdInput
): Promise<User> => {
    const body: Record<string, unknown> = {
        ...(updates.name != null ? { name: updates.name } : null),
        ...(updates.email != null ? { email: updates.email } : null),
        ...(updates.phone != null ? { phone: updates.phone } : null),
        ...(updates.address != null ? { address: updates.address } : null),
    };

    try {
        const res = await api.put(`/users/${userId}`, body);
        const raw = res.data?.data ?? res.data?.user ?? res.data;
        return normalizeUser(raw);
    } catch (err: any) {
        // Some APIs only allow PATCH
        if (err?.status === 405 || err?.status === 404) {
            const res = await api.patch(`/users/${userId}`, body);
            const raw = res.data?.data ?? res.data?.user ?? res.data;
            return normalizeUser(raw);
        }
        throw err;
    }
};

export const deleteUserById = async (userId: string): Promise<void> => {
    try {
        await api.delete(`/users/${userId}`);
        return;
    } catch (err: any) {
        // Some APIs use a different route or method
        if (err?.status === 405 || err?.status === 404) {
            await api.delete(`/user/${userId}`);
            return;
        }
        throw err;
    }
};

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get("/users");
    const body = res.data;

    const rawList = Array.isArray(body)
        ? body
        : Array.isArray(body?.data)
          ? body.data
          : Array.isArray(body?.users)
            ? body.users
            : [];

    return rawList.map(normalizeUser);
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
    const roleName = Array.isArray(payload.roles) ? payload.roles[0] : undefined;
    const roleSlug = toApiRoleSlug(roleName);

    const emailNormalized = payload.email.trim().toLowerCase();

    const common: CreateUserRequestBody = {
        name: payload.name,
        email: emailNormalized,
        password: payload.password,
        phone: payload.phone,
        address: payload.address,
        status: payload.status ?? true,
        permissions: payload.permissions,
        password_confirmation: payload.password,
    };

    // Try to send a backend-friendly role first (producer/seller), then fall back.
    const attempts: CreateUserRequestBody[] = [];

    if (roleSlug) {
        // Prefer the backend-expected shape: `roles: ["seller"]` etc.
        attempts.push({ ...common, roles: [roleSlug] });
    }

    if (roleName && roleName !== roleSlug) {
        attempts.push({ ...common, roles: [roleName] });
    }

    if (roleSlug) {
        attempts.push({ ...common, role: roleSlug });
    }
    if (roleName && roleName !== roleSlug) {
        attempts.push({ ...common, role: roleName });
    }

    let lastErr: any;
    for (const body of attempts) {
        try {
            if (__DEV__) {
                console.log("[createUser] attempt payload", {
                    email: body.email,
                    status: body.status,
                    role: body.role,
                    roles: body.roles,
                    permissionsCount: Array.isArray(body.permissions) ? body.permissions.length : 0,
                });
            }

            const res = await api.post("/users", body);

            const raw = res.data?.data ?? res.data?.user ?? res.data;
            const normalized = normalizeUser(raw);

            if (__DEV__) {
                console.log("[createUser] created user response", {
                    hasData: !!res.data,
                    rawType: typeof raw,
                    normalizedId: normalized.id,
                    normalizedEmail: normalized.email,
                    normalizedRole: normalized.role,
                });
            }

            return normalized;
        } catch (err: any) {
            lastErr = err;
            const status = err?.status;

            if (__DEV__) {
                console.log("[createUser] attempt failed", {
                    status,
                    message: err?.message,
                    errors: err?.data?.errors,
                    dataMessage: err?.data?.message,
                });
            }

            if (status === 422) continue;

            if (status === 500) {
                try {
                    const users = await getUsers();
                    const found = users.find(
                        (u) => (u.email ?? "").trim().toLowerCase() === emailNormalized
                    );
                    if (found) return found;
                } catch {
                    // ignore lookup failure and surface original error
                }

                throw err;
            }

            throw err;
        }
    }

    // If all role variants failed with 422, optionally fall back to `role` field.
    // This keeps compatibility with backends that accept only `role: "seller"`.
    if (roleSlug) {
        try {
            const res = await api.post("/users", { ...common, role: roleSlug });
            const raw = res.data?.data ?? res.data?.user ?? res.data;
            return normalizeUser(raw);
        } catch (err: any) {
            lastErr = err;
        }
    }

    if (roleName && roleName !== roleSlug) {
        try {
            const res = await api.post("/users", { ...common, role: roleName });
            const raw = res.data?.data ?? res.data?.user ?? res.data;
            return normalizeUser(raw);
        } catch (err: any) {
            lastErr = err;
        }
    }

    throw lastErr;
};

export const createProducerUser = async (input: CreateProducerInput): Promise<User> => {
    if (__DEV__) {
        console.log("[createProducerUser] creating user", {
            name: input.name,
            email: input.email,
            phone: input.phone,
            address: input.address,
            permissionsCount: input.permissions?.length ?? 0,
        });
    }

    const user = await createUser({
        name: input.name,
        email: input.email,
        password: input.password,
        phone: input.phone,
        address: input.address,
        status: true,
        roles: ["producer"],
        permissions: input.permissions,
    });

    if (__DEV__) {
        console.log("[createProducerUser] created user", {
            id: (user as any)?.id,
            name: (user as any)?.name,
            email: (user as any)?.email,
            roles: (user as any)?.roles,
        });
    }

    return user;
};

export const createSellerUser = async (input: CreateSellerInput): Promise<User> => {
    if (__DEV__) {
        console.log("[createSellerUser] creating user", {
            name: input.name,
            email: input.email,
            phone: input.phone,
            address: input.address,
            permissionsCount: input.permissions?.length ?? 0,
        });
    }

    const user = await createUser({
        name: input.name,
        email: input.email,
        password: input.password,
        phone: input.phone,
        address: input.address,
        status: true,
        roles: ["seller"],
        permissions: input.permissions,
    });

    if (__DEV__) {
        console.log("[createSellerUser] created user", {
            id: (user as any)?.id,
            name: (user as any)?.name,
            email: (user as any)?.email,
            roles: (user as any)?.roles,
        });
    }

    return user;
};
