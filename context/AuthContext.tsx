"use client";

import { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "@/lib/auth/tokenStore";
import { refreshAccessToken } from "@/lib/auth/refreshClient";
import api from "@/lib/axios";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const access = getAccessToken();

      if (!access) {
        try {
          const newToken = await refreshAccessToken(); // 👈 this hits /api/auth/refresh-token
          if (newToken) {
            setAccessToken(newToken);

            // Optional: preload user data
            const res = await api.get("/dj-rest-auth/user/");
            console.log("Restored user:", res.data);

            // Optional: redirect or reload page
            // router.refresh();
          }
        } catch (err) {
          console.log("Auto login failed", err);
        }
      }

      setLoading(false);
    }

    restoreSession();
  }, []);

  if (loading) return null; // ⏳ Optional: show spinner

  return <>{children}</>;
}
