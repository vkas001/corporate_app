import api from "@/services/api";
import type { UserRole } from "@/types/user";
import { getAuth } from "@/utils/auth";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    photo?: string;  // Backend uses 'photo' not 'avatar'
    phone?: string;
    address?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const getUserProfile = async (): Promise<User> => {
    const res = await api.get("/user/profile");
    return res.data;
};

export const getCurrentUser = async (): Promise<User | null> => {
    const auth = await getAuth();
    return auth?.user ?? null;
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
