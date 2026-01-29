import api from "@/services/api";
import { EggType, EggUnit } from "@/types/market";
import type { AxiosRequestConfig } from "axios";

const withAuth = (token?: string): AxiosRequestConfig =>
  token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

const normalize = (data: any): any => {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data?.egg_types && Array.isArray(data.egg_types)) return data.egg_types;
  return Array.isArray(data) ? data : [];
};

export const EggTypesService = {
  // Egg Types
  async getAll(token?: string): Promise<EggType[]> {
    try {
      const res = await api.get("/egg-types", withAuth(token));
      const normalized = normalize(res.data);
      // Ensure we always return an array
      return Array.isArray(normalized) ? normalized : [];
    } catch (error: any) {
      // Let authentication errors propagate to the API interceptor
      if (error?.message === "Session expired") {
        throw error;
      }
      console.error('Error fetching egg types:', error);
      return [];
    }
  },

  async getById(id: string, token?: string): Promise<EggType> {
    const res = await api.get(`/egg-types/${id}`, withAuth(token));
    return res.data;
  },

  async create(data: Partial<EggType>, token?: string): Promise<EggType> {
    const res = await api.post("/egg-types", data, withAuth(token));
    const responseData = res.data?.data || res.data?.egg_type || res.data;
    return responseData;
  },

  async update(id: string, data: Partial<EggType>, token?: string) {
    return api.put(`/egg-types/${id}`, data, withAuth(token));
  },

  async remove(id: string, token?: string) {
    return api.delete(`/egg-types/${id}`, withAuth(token));
  },

  // Egg Units
  async getUnits(eggType: string, token?: string): Promise<EggUnit[]> {
    try {
      const res = await api.get(`/egg-types/${eggType}/units`, withAuth(token));
      const normalized = normalize(res.data);
      return Array.isArray(normalized) ? normalized : [];
    } catch (error: any) {
      // Let authentication errors propagate to the API interceptor
      if (error?.message === "Session expired") {
        throw error;
      }
      console.error(`Error fetching units for ${eggType}:`, error);
      return [];
    }
  },

  async createUnit(
    eggType: string,
    data: Partial<EggUnit>,
    token?: string
  ) {
    return api.post(`/egg-types/${eggType}/units`, data, withAuth(token));
  },

  async updateUnit(
    eggType: string,
    unit: string,
    data: Partial<EggUnit>,
    token?: string
  ) {
    return api.put(
      `/egg-types/${eggType}/units/${unit}`,
      data,
      withAuth(token)
    );
  },

  async deleteUnit(
    eggType: string,
    unit: string,
    token?: string
  ) {
    return api.delete(
      `/egg-types/${eggType}/units/${unit}`,
      withAuth(token)
    );
  },
};
