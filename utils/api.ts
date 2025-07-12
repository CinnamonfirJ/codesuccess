// utils/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (credentials: {
  username?: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Very important for cookies
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Login failed");
  return await res.json();
};

export const logout = async () => {
  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/logout/`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
};

export const getUser = async () => {
  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");
  return await res.json();
};
