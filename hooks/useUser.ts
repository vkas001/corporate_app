import { getCurrentUser, getUserProfile, type User } from "@/services/userService";
import { useCallback, useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async (options?: { forceRemote?: boolean }) => {
    try {
      setLoading(true);
      setError(null);

      if (!options?.forceRemote) {
        const cachedUser = await getCurrentUser();
        if (cachedUser) {
          setUser(cachedUser);
          return cachedUser;
        }
      }

      const profileData = await getUserProfile();
      setUser(profileData);
      return profileData;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user"));
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { user, loading, error, refetch };
};
