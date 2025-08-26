"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "./follow-button";

export type MiniRelation = { profile_id: number | string; username: string };

type Props = {
  title?: string;
  items: MiniRelation[];
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
        const id = String(f.profile_id);
        const isFollowing =
          myFollowingIds.has(id) || myFollowingIds.has(Number(id));
        const initials = (f.username?.[0] || "U").toUpperCase();
        return (
          <div
            key={`${f.profile_id}-${f.username}`}
            className='flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg'
          >
            <Link
              href={`/profile/${encodeURIComponent(String(f.profile_id))}`}
              className='flex items-center gap-3'
            >
              <Avatar className='w-8 h-8'>
                <AvatarImage
                  src={`/placeholder.svg?height=32&width=32&query=${encodeURIComponent(f.username || "user")}`}
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
              targetId={id}
              initialFollowed={isFollowing}
              onToggled={(next) => onFollowingChange(id, next)}
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
