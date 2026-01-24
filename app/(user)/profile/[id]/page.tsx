"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import moment from "moment";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  Mail,
  Edit,
  ArrowLeft,
  Users,
  UserCircle2,
} from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { ConnectionsList } from "@/app/components/connections-list";
import { FollowButton } from "@/app/components/follow-button";

// --- animation configs ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

// --- flexible type for followers/following ---
type UserLike = {
  profile_id?: number | string;
  id?: number | string;
  username: string;
};

import { useProfile } from "@/hooks/features/useProfile";

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { user: currentUser } = useUser();
  const username = id === "me" ? currentUser?.username : id;
  
  const { data: profile, isLoading: loading } = useProfile(username || null);
  
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  const isOwnProfile = useMemo(() => {
    if (!currentUser?.username) return id === "me";
    return id === "me" || currentUser.username === id;
  }, [id, currentUser]);

  // Derived state for am I following this profile?
  const followedByMe = useMemo(() => {
    if (!profile || !currentUser) return false;
    return profile.followers.some(f => f.username === currentUser.username);
  }, [profile, currentUser]);

  if (loading || (!profile && id !== "me" && !currentUser)) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
        <div className='text-gray-500'>Loading...</div>
      </div>
    );
  }

  const displayProfile = id === "me" && currentUser ? {
    ...profile,
    profile_image: currentUser?.profile?.profile_image || null,
    user_email: currentUser?.email || currentUser?.profile?.user_email || "",
    username: currentUser?.username || "",
    first_name: currentUser?.first_name || "",
    last_name: currentUser?.last_name || "",
    bio: currentUser?.profile?.bio || null,
    followers: profile?.followers || [],
    following: profile?.following || [],
  } : profile;

  if (!displayProfile) {
      return (
        <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
          <div className='text-gray-500'>Profile not found</div>
        </div>
      );
  }

  return (
    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
      <div className='mx-auto px-6 py-8 max-w-7xl'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex justify-between items-center'>
            <div className='flex justify-start items-center gap-4 mb-4'>
              <Link href='/homepage'>
                <Button variant='ghost' className='gap-2'>
                  <ArrowLeft className='w-4 h-4' />
                  Home
                </Button>
              </Link>
              <h1 className='font-bold text-gray-900 text-3xl'>
                {isOwnProfile
                  ? "My Profile"
                  : `${displayProfile.first_name} ${displayProfile.last_name}`}
              </h1>
            </div>

            {!isOwnProfile && (
              <FollowButton
                targetId={displayProfile.username}
                targetImage={displayProfile.profile_image}
                initialFollowed={followedByMe}
                className={
                  followedByMe
                    ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    : "bg-gradient-to-r from-emerald-500 to-blue-500 text-white"
                }
              />
            )}
          </div>
        </motion.div>

        <div className='gap-8 grid lg:grid-cols-3'>
          {/* Left Column - Profile Info */}
          <motion.div
            className='space-y-6 lg:col-span-1'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {/* Profile Card */}
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-xl border-0 overflow-hidden'>
                <CardHeader className='bg-gradient-to-r from-emerald-500 to-blue-500 p-8 text-white text-center'>
                  <Avatar className='mx-auto mb-4 border-4 border-white/20 w-24 h-24'>
                    <AvatarImage
                      src={
                        displayProfile?.profile_image ||
                        "/placeholder.svg?height=96&width=96&query=profile%20avatar"
                      }
                      alt={`${displayProfile?.first_name} ${displayProfile?.last_name}`}
                    />
                    <AvatarFallback className='bg-white/20 font-bold text-white text-2xl'>
                      {(displayProfile?.first_name?.[0] || "").toUpperCase()}
                      {(displayProfile?.last_name?.[0] || "").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className='mb-2 font-bold text-2xl'>
                    {displayProfile?.first_name} {displayProfile?.last_name}
                  </h2>
                  <p className='text-emerald-100 text-sm leading-relaxed'>
                    {displayProfile?.bio || ""}
                  </p>
                </CardHeader>
                <CardContent className='p-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <Mail className='w-4 h-4' />
                      <span className='text-sm'>{displayProfile?.user_email}</span>
                    </div>
                    {isOwnProfile && currentUser?.profile?.joined_at && (
                      <div className='flex items-center gap-3 text-gray-600'>
                        <Calendar className='w-4 h-4' />
                        <span className='text-sm'>
                          Joined{" "}
                          {moment(currentUser?.profile.joined_at).format(
                            "Do MMM YYYY"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  {isOwnProfile && (
                    <Link href={"/profile/settings"}>
                      <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 mt-6 w-full text-white'>
                        <Edit className='mr-2 w-4 h-4' />
                        Edit Profile
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeInUp}>
              <Card className='bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg border-0 text-white'>
                <CardContent className='p-8'>
                  <h3 className='mb-4 font-bold text-xl'>
                    Continue Your Journey
                  </h3>
                  <p className='mb-6 text-emerald-100'>
                    You&apos;re doing great! Keep up the momentum and unlock new
                    achievements.
                  </p>
                  <div className='flex flex-wrap gap-4'>
                    <Button className='bg-white hover:bg-gray-100 text-emerald-600'>
                      <BookOpen className='mr-2 w-4 h-4' />
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column - Connections */}
          <motion.div
            className='space-y-6 lg:col-span-2'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardHeader className='pb-3'>
                  <div className='flex justify-between items-center'>
                    <h3 className='font-semibold text-gray-900 text-lg'>
                      Connections
                    </h3>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        className='gap-2'
                        onClick={() => setFollowersOpen(true)}
                      >
                        <Users className='w-4 h-4' />
                        Followers ({displayProfile.followers?.length ?? 0})
                      </Button>
                      <Button
                        variant='outline'
                        className='gap-2'
                        onClick={() => setFollowingOpen(true)}
                      >
                        <UserCircle2 className='w-4 h-4' />
                        Following ({displayProfile.following?.length ?? 0})
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <ConnectionsList
                    title='Followers'
                    items={displayProfile.followers ?? []}
                  />
                  <Separator />
                  <ConnectionsList
                    title='Following'
                    items={displayProfile.following ?? []}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Followers Modal */}
        <Dialog open={followersOpen} onOpenChange={setFollowersOpen}>
          <DialogContent className='sm:max-w-[520px]'>
            <DialogHeader>
              <DialogTitle>
                Followers ({displayProfile.followers?.length ?? 0})
              </DialogTitle>
            </DialogHeader>
            <ConnectionsList
              items={displayProfile.followers ?? []}
            />
          </DialogContent>
        </Dialog>

        {/* Following Modal */}
        <Dialog open={followingOpen} onOpenChange={setFollowingOpen}>
          <DialogContent className='sm:max-w-[520px]'>
            <DialogHeader>
              <DialogTitle>
                Following ({displayProfile.following?.length ?? 0})
              </DialogTitle>
            </DialogHeader>
            <ConnectionsList
              items={displayProfile.following ?? []}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
