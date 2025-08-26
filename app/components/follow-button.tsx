"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast"

type FollowButtonProps = {
  targetId: string | number;
  targetImage?: string | null;
  initialFollowed: boolean;
  onToggled?: (next: boolean) => void;
  className?: string;
};

export function FollowButton({
  targetId,
  targetImage,
  initialFollowed,
  onToggled,
  className,
}: FollowButtonProps) {
  const [following, setFollowing] = useState<boolean>(!!initialFollowed);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  // const { toast } = useToast()

  async function toggle() {
    if (targetId === undefined || targetId === null || targetId === "") {
      console.error("FollowButton: missing targetId");
      return;
    }
    setBusy(true);
    const next = !following;
    try {
      const endpoint = next ? "follow" : "unfollow";
      const res = await fetch(
        `/api/accounts/profiles/${encodeURIComponent(String(targetId))}/${endpoint}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          // Ensure a valid absolute URL is always sent
          body: JSON.stringify({
            profile_image:
              typeof targetImage === "string" && targetImage.startsWith("http")
                ? targetImage
                : "https://placehold.co/96x96/png",
          }),
        }
      );
      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        // leave data as null if non-JSON
      }
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        const detail = data?.detail || text || "Unable to update follow state";
        throw new Error(detail);
      }
      setFollowing(next);
      onToggled?.(next);
      // toast({
      //   title: next ? "Followed" : "Unfollowed",
      //   description: data?.username ? `@${data.username}` : undefined,
      // })
    } catch {
      // toast({
      //   variant: "destructive",
      //   title: "Action failed",
      //   description: e?.message || "Please try again",
      // })
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      onClick={toggle}
      disabled={busy}
      className={
        className ||
        (following
          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
          : "bg-gradient-to-r from-emerald-500 to-blue-500 text-white")
      }
    >
      {busy ? (
        <span>...</span>
      ) : following ? (
        <>
          <UserMinus className='mr-2 w-4 h-4' /> Unfollow
        </>
      ) : (
        <>
          <UserPlus className='mr-2 w-4 h-4' /> Follow
        </>
      )}
    </Button>
  );
}
