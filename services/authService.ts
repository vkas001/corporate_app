import api from "@/services/api";
import { saveAuth } from "@/utils/auth";

const signIn = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });

  const { token, roles, permissions, user } = res.data;

  await saveAuth(token, roles, permissions, user);

  return user;
};
