// lib/api/auth/getUser.ts
export async function getUser() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/dj-rest-auth/user/`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}
