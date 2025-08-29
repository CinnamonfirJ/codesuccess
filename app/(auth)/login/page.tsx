import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/lib/axios"; // your axios instance
import LoginForm from "./LoginForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

async function getUser() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;

  if (!access) return null;

  try {
    const res = await api.get("/dj-rest-auth/user/", {
      headers: { Authorization: `Bearer ${access}` },
    });
    return res.data;
  } catch {
    // try refresh
    if (!refresh) return null;

    const refreshRes = await fetch(`${SITE_URL}/api/auth/refresh-token`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `refresh=${refresh}`,
      },
    });

    if (!refreshRes.ok) return null;

    const newAccess = (await cookies()).get("access")?.value;
    if (!newAccess) return null;

    try {
      const retryRes = await api.get("/dj-rest-auth/user/", {
        headers: { Authorization: `Bearer ${newAccess}` },
      });
      return retryRes.data;
    } catch {
      return null;
    }
  }
}

export default async function LoginPage() {
  const user = await getUser();

  if (user) {
    redirect("/homepage"); // ✅ already logged in → send to homepage
  }

  return <LoginForm />;
}
