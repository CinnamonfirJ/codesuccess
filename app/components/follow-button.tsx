"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserMinus, UserPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFollowMutation, useUnfollowMutation } from "@/hooks/features/useProfile";
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
  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();

  const busy = followMutation.isPending || unfollowMutation.isPending;

  async function toggle() {
    if (targetId === undefined || targetId === null || targetId === "") {
      console.error("FollowButton: missing targetId");
      return;
    }
    
    const username = String(targetId);
    
    try {
      if (following) {
        await unfollowMutation.mutateAsync({ username, profile_image: targetImage });
      } else {
        await followMutation.mutateAsync({ username, profile_image: targetImage });
      }
      setFollowing(!following);
      onToggled?.(!following);
    } catch (error) {
       console.error("Follow action failed:", error);
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
        <Loader2 className="w-4 h-4 animate-spin" />
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
