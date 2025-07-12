// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
  profile?: {
    avatar?: string;
    bio?: string;
    location?: string;
  };
} | null;

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/pages/api/user", { credentials: "include" });

        if (!res.ok) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
