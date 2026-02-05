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
      const error = err instanceof Error ? err : new Error("Failed to fetch user");
      setError(error);
      setUser(null);
      // Don't rethrow in initial fetch to avoid uncaught promise rejection
      if (!options?.forceRemote) {
        console.warn("Failed to fetch user profile:", error.message);
        return null;
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Wrap in async IIFE to handle promise rejection
    (async () => {
      try {
        await refetch();
      } catch (err) {
        // Error already handled in refetch, just log
        console.warn("Initial user fetch failed:", err);
      }
    })();
  }, [refetch]);

  return { user, loading, error, refetch };
};
