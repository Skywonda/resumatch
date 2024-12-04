import { useState, useEffect } from "react";
import { checkAuthStatus } from "@/lib/utils/api";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { isAuthenticated, user } = await checkAuthStatus();
        setIsAuthenticated(isAuthenticated);
        setUser(user);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading, user };
};
