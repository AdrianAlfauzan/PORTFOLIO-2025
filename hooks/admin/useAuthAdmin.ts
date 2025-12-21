import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { ADMIN_PASSWORD, COOKIE_NAME, COOKIE_MAX_AGE } from "@/constants/admin";

const checkAuthCookie = (): boolean => {
  if (typeof document === "undefined") return false;

  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies[COOKIE_NAME] === "true";
};

export const useAuthAdmin = () => {
  const router = useRouter();
  const { success, error } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuthCookie());
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      // Debug: cek apakah password ada
      console.log("Input password:", password);
      console.log("Expected password:", ADMIN_PASSWORD);
      
      if (!ADMIN_PASSWORD) {
        error("Configuration Error", "Admin password not configured", 3000);
        return false;
      }
      
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        document.cookie = `${COOKIE_NAME}=true; path=/; max-age=${COOKIE_MAX_AGE}`;
        success("Login Successful", "Welcome to Admin Panel", 2000);
        return true;
      } else {
        error("Login Failed", "Wrong password!", 3000);
        return false;
      }
    },
    [password, success, error]
  );

  const handleLogout = useCallback(() => {
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setIsAuthenticated(false);
    router.push("/guestbook");
  }, [router]);

  return {
    isAuthenticated,
    password,
    setPassword,
    handleLogin,
    handleLogout,
  };
};