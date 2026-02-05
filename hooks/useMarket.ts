import { EggTypesService } from '@/services/marketService';
import { EggType, EggUnit } from '@/types/market';
import { useEffect, useState } from 'react';

export function useMarket(token?: string) {
  const [eggTypes, setEggTypes] = useState<EggType[]>([]);
  const [units, setUnits] = useState<EggUnit[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEggTypes = async () => {
    try {
      setLoading(true);
      const data = await EggTypesService.getAll(token);
      setEggTypes(data);
    } catch (error: any) {
      console.error("Failed to fetch egg types:", error);
      // Session expired errors will be handled by the API interceptor
      // which redirects to login, so we just log here
    } finally {
      setLoading(false);
    }
  };

  const fetchUnits = async (eggType: string) => {
    try {
      setLoading(true);
      const data = await EggTypesService.getUnits(eggType, token);
      setUnits(data);
    } catch (error: any) {
      console.error(`Failed to fetch units for ${eggType}:`, error);
      // Session expired errors will be handled by the API interceptor
    } finally {
      setLoading(false);
    }
  };

  const createEggType = async (data: Partial<EggType>) => {
    try {
      await EggTypesService.create(data, token);
      await fetchEggTypes();
    } catch (error) {
      throw error;
    }
  };

  const updateEggType = async (id: string, data: Partial<EggType>) => {
    try {
      await EggTypesService.update(id, data, token);
      await fetchEggTypes();
    } catch (error) {
      throw error;
    }
  };

  const deleteEggType = async (id: string) => {
    try {
      await EggTypesService.remove(id, token);
      await fetchEggTypes();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // Wrap in async IIFE to handle promise rejection
    (async () => {
      try {
        await fetchEggTypes();
      } catch (err) {
        // Error already logged in fetchEggTypes
        console.warn("Initial egg types fetch failed:", err);
      }
    })();
  }, []);

  return {
    eggTypes,
    units,
    loading,
    fetchEggTypes,
    fetchUnits,
    createEggType,
    updateEggType,
    deleteEggType,
  };
}
