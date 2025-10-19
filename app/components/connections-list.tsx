"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "./follow-button";

type UserLike = {
  profile_id?: number | string;
  profile_image?: string | null;
  id?: number | string;
  username: string;
};

type Props = {
  title?: string;
  items: UserLike[];
  myFollowingIds: Set<number | string>;
  onFollowingChange: (id: number | string, nowFollowing: boolean) => void;
};

export function ConnectionsList({
  title,
  items,
  myFollowingIds,
  onFollowingChange,
}: Props) {
  return (
    <div className='space-y-3'>
      {title ? <p className='font-medium text-gray-900'>{title}</p> : null}

      {(items ?? []).map((f) => {
        // pick the best identifier available
        const id = f.profile_id ?? f.id ?? f.username;
        const idStr = String(id);

        const isFollowing =
          myFollowingIds.has(idStr) || myFollowingIds.has(Number(idStr));

        const initials = (f.username?.[0] || "U").toUpperCase();

        return (
          <div
            key={`${idStr}-${f.username}`}
            className='flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg'
          >
            <Link
              href={`/profile/${encodeURIComponent(idStr)}`}
              className='flex items-center gap-3'
            >
              <Avatar className='w-8 h-8'>
                <AvatarImage
                  src={f.profile_image || "/placeholder.svg"}
                  alt={f.username}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className='min-w-0'>
                <p className='font-medium text-gray-900 text-sm truncate'>
                  @{f.username}
                </p>
              </div>
            </Link>

            <FollowButton
              targetId={idStr}
              initialFollowed={isFollowing}
              onToggled={(next) => onFollowingChange(idStr, next)}
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
