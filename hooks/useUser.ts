import { getCurrentUser, getUserProfile, type User } from "@/services/userService";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get cached user first
        const cachedUser = await getCurrentUser();
        if (cachedUser) {
          setUser(cachedUser);
          setLoading(false);
          return;
        }
        
        // If no cached user, fetch from API
        const profileData = await getUserProfile();
        setUser(profileData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch user"));
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
