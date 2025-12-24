import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAuth = async (token: string, role:string) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("role", role);
};

export const getRole = async () => {
    return AsyncStorage.getItem("role");
};

export const getToken = async () => {
    return AsyncStorage.getItem("token");
};

export const logout = async () => {
    await AsyncStorage.multiRemove(["token", "role"]);
};