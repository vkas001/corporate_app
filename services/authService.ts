import api from "@/services/api";
import { saveAuth } from "@/utils/auth";

export const signIn = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });

  return res.data;
};
