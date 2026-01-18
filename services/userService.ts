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
    return res.data;
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
    const roleNameLower = roleName ? roleName.toLowerCase() : undefined;

    const baseBody: CreateUserRequestBody = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        address: payload.address,
        roles: payload.roles,
        permissions: payload.permissions,
        password_confirmation: payload.password,
    };

    try {
        const res = await api.post("/users", baseBody);
        return res.data;
    } catch (err: any) {
    
        if (err?.status === 500 && roleName) {
 
            const retryBody: CreateUserRequestBody = {
                ...baseBody,
                roles: [roleNameLower ?? roleName],
            };

            try {
                const res = await api.post("/users", retryBody);
                return res.data;
            } catch {
             
                throw err;
            }
        }

        throw err;
    }
};

export const createProducerUser = async (input: CreateProducerInput): Promise<User> => {
    return createUser({
        name: input.name,
        email: input.email,
        password: input.password,
        phone: input.phone,
        address: input.address,
        roles: ["Producer"],
        permissions: input.permissions,
    });
};

export const createSellerUser = async (input: CreateSellerInput): Promise<User> => {
    return createUser({
        name: input.name,
        email: input.email,
        password: input.password,
        phone: input.phone,
        address: input.address,
        roles: ["Seller"],
        permissions: input.permissions,
    });
};
