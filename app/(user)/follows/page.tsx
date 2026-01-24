"use client";

import { useCanFollow, useProfiles, useFollowMutation, useUnfollowMutation, ProfileSmall } from "@/hooks/features/useProfile";
import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search, UserMinus, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LeftSidebar from "@/app/components/left-sidebar";
import RightSidebar from "@/app/components/right-sidebar";
import { getCourses } from "@/sanity/lib/courses/getCourses";

export default function FollowsPage() {
    const { user: currentUser } = useUser();
    const [search, setSearch] = useState("");
    
    const { data: suggested, isLoading: loadingSuggested } = useCanFollow();
    const { data: searchResults, isLoading: loadingSearch } = useProfiles(search ? { username: search } : undefined);
    
    const followMutation = useFollowMutation();
    const unfollowMutation = useUnfollowMutation();

    const handleFollowToggle = (profile: ProfileSmall) => {
        if (profile.followed_by_me) {
            unfollowMutation.mutate({ username: profile.username, profile_image: profile.profile_image });
        } else {
            followMutation.mutate({ username: profile.username, profile_image: profile.profile_image });
        }
    };

    return (
        <main className={`container pt-8 mx-auto bg-background `}>
            <div className='flex md:flex-row flex-col'>
                {/* Left Sidebar */}
                <div className='hidden md:block top-0 sticky border-gray-200 border-r md:w-1/4 lg:w-1/5 h-screen overflow-y-auto'>
                    <LeftSidebar courses={[]} /> {/* Passes empty as it's client component fetching might be elsewhere */}
                </div>

                {/* Main Content */}
                <div className='w-full md:w-2/4 lg:w-3/5 min-h-screen p-6'>
                    <h1 className="text-3xl font-bold mb-8">Find People</h1>
                    
                    {/* Search Section */}
                    <div className="relative mb-8">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input 
                            placeholder="Search by username..." 
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Results Section */}
                    {search && (
                        <section className="mb-12">
                            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                            {loadingSearch ? (
                                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-500" /></div>
                            ) : searchResults?.length ? (
                                <div className="grid gap-4">
                                    {searchResults.map(p => (
                                        <ProfileCard key={p.id} profile={p} onToggle={() => handleFollowToggle(p)} isOwn={p.username === currentUser?.username} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No profiles found matching "{search}"</p>
                            )}
                        </section>
                    )}

                    {/* Suggested Section */}
                    {!search && (
                        <section>
                            <h2 className="text-xl font-semibold mb-4">You Might Like</h2>
                            {loadingSuggested ? (
                                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-500" /></div>
                            ) : suggested?.length ? (
                                <div className="grid gap-4">
                                    {suggested.map(p => (
                                        <ProfileCard key={p.id} profile={p} onToggle={() => handleFollowToggle(p)} isOwn={p.username === currentUser?.username} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No suggestions at the moment.</p>
                            )}
                        </section>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className='hidden md:block top-0 sticky border-gray-200 border-l md:w-1/4 lg:w-1/5 h-screen overflow-y-auto'>
                    <RightSidebar />
                </div>
            </div>
        </main>
    );
}

function ProfileCard({ profile, onToggle, isOwn }: { profile: ProfileSmall, onToggle: () => void, isOwn: boolean }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
                <Link href={`/profile/${profile.username}`} className="flex items-center gap-4 flex-1">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={profile.profile_image || ""} />
                        <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-gray-900">{profile.full_name || `@${profile.username}`}</p>
                        <p className="text-sm text-gray-500">@{profile.username}</p>
                    </div>
                </Link>
                {!isOwn && (
                    <Button 
                        variant={profile.followed_by_me ? "outline" : "default"}
                        size="sm"
                        onClick={onToggle}
                        className={profile.followed_by_me ? "border-emerald-200 text-emerald-600" : "bg-gradient-to-r from-emerald-500 to-blue-500 text-white"}
                    >
                        {profile.followed_by_me ? (
                            <><UserMinus className="w-4 h-4 mr-2" /> Unfollow</>
                        ) : (
                            <><UserPlus className="w-4 h-4 mr-2" /> Follow</>
                        )}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
