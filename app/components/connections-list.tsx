"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "./follow-button";
import { useFollowMutation, useUnfollowMutation } from "@/hooks/features/useProfile";

type UserLike = {
  profile_id?: number | string;
  profile_image?: string | null;
  id?: number | string;
  username: string;
};

type Props = {
  title?: string;
  items: UserLike[];
};

export function ConnectionsList({
  title,
  items,
}: Props) {
  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();

  return (
    <div className='space-y-3'>
      {title ? <p className='font-medium text-gray-900'>{title}</p> : null}

      {(items ?? []).map((f) => {
        const username = f.username;
        const initials = (username?.[0] || "U").toUpperCase();

        return (
          <div
            key={username}
            className='flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg'
          >
            <Link
              href={`/profile/${username}`}
              className='flex items-center gap-3'
            >
              <Avatar className='w-8 h-8'>
                <AvatarImage
                  src={f.profile_image || "/placeholder.svg"}
                  alt={username}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className='min-w-0'>
                <p className='font-medium text-gray-900 text-sm truncate'>
                  @{username}
                </p>
              </div>
            </Link>

            <FollowButton
              targetId={username}
              initialFollowed={true} // In this list, we don't easily know if WE follow them unless the API provides it. 
              // However, the connections list is often a static list of who they follow or who follows them.
              // For simplicity and since the user wants a management page anyway, I'll update FollowButton to handles its own state better if possible, 
              // or just use useProfile status if available.
            />
          </div>
        );
      })}

      {(!items || items.length === 0) && (
        <p className='text-muted-foreground text-sm'>No users found.</p>
      )}
    </div>
  );
}
