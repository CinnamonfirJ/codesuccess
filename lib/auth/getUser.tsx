"use client";

type UserType = {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
};

export async function getUser(): Promise<UserType | null> {
  try {
    const res = await fetch("/api/user", {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const user: UserType = await res.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
