import type { CreateProducerInput } from "@/components/forms/ProducerForm";
import type { CreateSellerInput } from "@/components/forms/SellerForm";
import api from "@/services/api";
import type { UserRole } from "@/types/user";
import { getAuth, type AuthUser } from "@/utils/auth";

export interface User {
    id: number | string;
    email: string;
    name: string | null;

    role: UserRole;

    roles?: string[];
    permissions?: string[];
    status?: boolean;
    photo?: string | null; 
    phone?: string | null;
    address?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export const getUserProfile = async (): Promise<User> => {
    const res = await api.get("/user/profile");
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

export type UpdateUserByIdInput = {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
};

const normalizeRole = (input: unknown): UserRole => {
    const raw = typeof input === "string" ? input : "";
    const v = raw.trim().toLowerCase();

    // Be forgiving: APIs sometimes return labels like "Producer User".
    if (v.includes("admin") || v.includes("super")) return "superAdmin";
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
    if (v.includes("admin") || v.includes("super")) return "superAdmin";

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

type CreateUserPayload = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    roles: string[];
    permissions?: string[];
};

type CreateUserRequestBody = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    roles?: string[];
    permissions?: string[];

    password_confirmation?: string;

    role?: string;
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
    const roleName = Array.isArray(payload.roles) ? payload.roles[0] : undefined;
    const roleSlug = toApiRoleSlug(roleName);

    const common: CreateUserRequestBody = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        address: payload.address,
        permissions: payload.permissions,
        password_confirmation: payload.password,
    };

    // Try to send a backend-friendly role first (producer/seller), then fall back.
    const attempts: CreateUserRequestBody[] = [];

    if (roleSlug) {
        attempts.push({ ...common, roles: [roleSlug], role: roleSlug });
    }

    // If caller passes a label like "Producer", try it too.
    if (roleName && roleName !== roleSlug) {
        attempts.push({ ...common, roles: [roleName], role: roleName });
    }

    // Some backends accept only `role` (string)
    if (roleSlug) {
        attempts.push({ ...common, role: roleSlug });
    }
    if (roleName && roleName !== roleSlug) {
        attempts.push({ ...common, role: roleName });
    }

    let lastErr: any;
    for (const body of attempts) {
        try {
            const res = await api.post("/users", body);
            return res.data;
        } catch (err: any) {
            lastErr = err;
            const status = err?.status;
            if (status !== 422 && status !== 500) throw err;
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
        roles: ["Producer"],
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
        roles: ["Seller"],
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
