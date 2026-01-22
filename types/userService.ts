import type { UserRole } from "@/types/user";

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

export type UpdateUserByIdInput = {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
};

export type CreateUserPayload = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    status?: boolean;
    roles: string[];
    permissions?: string[];
};

export type CreateUserRequestBody = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    status?: boolean;
    roles?: string[];
    permissions?: string[];

    password_confirmation?: string;

    role?: string;
};
