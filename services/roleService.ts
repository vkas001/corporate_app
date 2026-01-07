import api from "@/services/api";

export type Permission = {
  name: string;
};

export type Role = {
  name: string;
  permissions: Permission[];
};

export const getRoles = async (
  perPage = 50,
  search = ""
): Promise<Role[]> => {
  const res = await api.get("/roles", {
    params: {
      per_page: perPage,
      search,
    },
  });

  return res.data;
};
