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
import {
  ConnectionsList,
  MiniRelation,
} from "@/app/components/connections-list";
import { FollowButton } from "@/app/components/follow-button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

type RemoteProfile = {
  id: number | string;
  profile_image: string | null;
  user_email: string;
  username: string;
  first_name: string;
  last_name: string;
  bio: string | null;
  followers: MiniRelation[];
  following: MiniRelation[];
};

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id; // can be "me", a numeric id, or a username
  // const router = useRouter()

  const { user: currentUser } = useUser();
  const [profile, setProfile] = useState<RemoteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  // Keep a set of "who I follow" so buttons render correctly everywhere
  const [myFollowingIds, setMyFollowingIds] = useState<Set<number | string>>(
    new Set()
  );

  const isOwnProfile = useMemo(() => {
    if (!currentUser?.profile?.id) return id === "me";
    return id === "me" || String(currentUser.profile.id) === String(id);
  }, [id, currentUser]);

  // Load viewed profile (me branch uses useUser; others use API and id can be username or numeric)
  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        if (!id || id === "me") {
          if (currentUser) {
            setProfile({
              id: String(currentUser.profile.id),
              profile_image: currentUser?.profile?.profile_image || null,
              user_email:
                currentUser?.email || currentUser?.profile?.user_email || "",
              username: currentUser?.username || "",
              first_name: currentUser?.first_name || "",
              last_name: currentUser?.last_name || "",
              bio: currentUser?.profile?.bio || null,
              followers: [],
              following: [],
            });
          } else {
            setProfile(null);
          }
          return;
        }

        const res = await fetch(
          `/api/accounts/profiles/${encodeURIComponent(String(id))}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data: RemoteProfile = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error loading profile:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id, currentUser]);

  // Load my following list (used to compute followedByMe and render follow buttons)
  useEffect(() => {
    let active = true;
    async function loadMyFollowing() {
      try {
        const res = await fetch("/api/accounts/me/following", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error();
        const arr = (await res.json()) as MiniRelation[];
        if (active) {
          const set = new Set<number | string>();
          for (const m of arr) {
            set.add(String(m.profile_id));
            set.add(Number(m.profile_id));
          }
          setMyFollowingIds(set);
        }
      } catch {
        if (active) setMyFollowingIds(new Set());
      }
    }
    loadMyFollowing();
    return () => {
      active = false;
    };
  }, []);

  // Am I following the viewed profile?
  const followedByMe = useMemo(() => {
    if (!profile) return false;
    return (
      myFollowingIds.has(String(profile.id)) ||
      myFollowingIds.has(Number(profile.id))
    );
  }, [profile, myFollowingIds]);

  // When follow state for the viewed profile toggles
  function onToggleViewed(next: boolean) {
    if (!profile) return;
    setMyFollowingIds((prev) => {
      const copy = new Set(prev);
      copy.add(String(profile.id)); // we'll add or remove after
      copy.add(Number(profile.id));
      if (next) {
        copy.add(String(profile.id));
        copy.add(Number(profile.id));
      } else {
        copy.delete(String(profile.id));
        copy.delete(Number(profile.id));
      }
      return copy;
    });
    // Reflect count change if we know our id
    if (currentUser?.profile?.id) {
      const myIdStr = String(currentUser.profile.id);
      const meMini: MiniRelation = {
        profile_id: myIdStr,
        username: currentUser.username || currentUser.first_name || "me",
      };
      setProfile((p) => {
        if (!p) return p;
        const exists = p.followers.some(
          (f) => String(f.profile_id) === myIdStr
        );
        if (next && !exists)
          return { ...p, followers: [...(p.followers || []), meMini] };
        if (!next && exists)
          return {
            ...p,
            followers: p.followers.filter(
              (f) => String(f.profile_id) !== myIdStr
            ),
          };
        return p;
      });
    }
  }

  // When a list item toggles follow/unfollow
  function onFollowingChange(targetId: number | string, nowFollowing: boolean) {
    setMyFollowingIds((prev) => {
      const copy = new Set(prev);
      if (nowFollowing) {
        copy.add(String(targetId));
        copy.add(Number(targetId));
      } else {
        copy.delete(String(targetId));
        copy.delete(Number(targetId));
      }
      return copy;
    });
    // If it's my own profile and I unfollow someone from "Following", remove it locally
    if (isOwnProfile && profile && !nowFollowing) {
      setProfile({
        ...profile,
        following: (profile.following || []).filter(
          (f) => String(f.profile_id) !== String(targetId)
        ),
      });
    }
  }

  if (loading || !profile) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
        <div className='text-gray-500'>Loading...</div>
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
                  : `${profile.first_name} ${profile.last_name}`}
              </h1>
            </div>

            {!isOwnProfile && (
              <FollowButton
                targetId={profile.id}
                targetImage={profile.profile_image}
                initialFollowed={followedByMe}
                onToggled={onToggleViewed}
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
                        profile?.profile_image ||
                        "/placeholder.svg?height=96&width=96&query=profile%20avatar"
                      }
                      alt={`${profile?.first_name} ${profile?.last_name}`}
                    />
                    <AvatarFallback className='bg-white/20 font-bold text-white text-2xl'>
                      {(profile?.first_name?.[0] || "").toUpperCase()}
                      {(profile?.last_name?.[0] || "").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className='mb-2 font-bold text-2xl'>
                    {profile?.first_name} {profile?.last_name}
                  </h2>
                  <p className='text-emerald-100 text-sm leading-relaxed'>
                    {profile?.bio || ""}
                  </p>
                </CardHeader>
                <CardContent className='p-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <Mail className='w-4 h-4' />
                      <span className='text-sm'>{profile?.user_email}</span>
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
                        Followers ({profile.followers?.length ?? 0})
                      </Button>
                      <Button
                        variant='outline'
                        className='gap-2'
                        onClick={() => setFollowingOpen(true)}
                      >
                        <UserCircle2 className='w-4 h-4' />
                        Following ({profile.following?.length ?? 0})
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <ConnectionsList
                    title='Followers'
                    items={profile.followers ?? []}
                    myFollowingIds={myFollowingIds}
                    onFollowingChange={onFollowingChange}
                  />
                  <Separator />
                  <ConnectionsList
                    title='Following'
                    items={profile.following ?? []}
                    myFollowingIds={myFollowingIds}
                    onFollowingChange={onFollowingChange}
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
                Followers ({profile.followers?.length ?? 0})
              </DialogTitle>
            </DialogHeader>
            <ConnectionsList
              items={profile.followers ?? []}
              myFollowingIds={myFollowingIds}
              onFollowingChange={onFollowingChange}
            />
          </DialogContent>
        </Dialog>

        {/* Following Modal */}
        <Dialog open={followingOpen} onOpenChange={setFollowingOpen}>
          <DialogContent className='sm:max-w-[520px]'>
            <DialogHeader>
              <DialogTitle>
                Following ({profile.following?.length ?? 0})
              </DialogTitle>
            </DialogHeader>
            <ConnectionsList
              items={profile.following ?? []}
              myFollowingIds={myFollowingIds}
              onFollowingChange={onFollowingChange}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
