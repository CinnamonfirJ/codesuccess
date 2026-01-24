// hooks/features/useProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type ProfileSmall = {
    id: number;
    profile_image: string | null;
    full_name: string;
    username: string;
    followed_by_me: boolean;
    followers_count: string | number;
    following_count: string | number;
};

export type ProfileDetail = {
    id: number;
    profile_image: string | null;
    user_email: string;
    username: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    followers_count: string | number;
    following_count: string | number;
    followers: { profile_id: number; username: string }[];
    following: { profile_id: number; username: string }[];
};

export function useProfile(username: string | null) {
    return useQuery({
        queryKey: ["profile", username],
        queryFn: async () => {
            const { data } = await axios.get<ProfileDetail>(`/api/accounts/profile/${username}`);
            return data;
        },
        enabled: !!username && username !== "me" && username !== "null",
    });
}

export function useProfiles(search?: { username?: string; first_name?: string; last_name?: string }) {
    return useQuery({
        queryKey: ["profiles", search],
        queryFn: async () => {
            const { data } = await axios.get<ProfileSmall[]>("/api/accounts/profile", { params: search });
            return data;
        },
    });
}

export function useCanFollow() {
    return useQuery({
        queryKey: ["can-follow"],
        queryFn: async () => {
            const { data } = await axios.get<ProfileSmall[]>("/api/accounts/profile/can_follow");
            return data;
        },
    });
}

export function useFollowMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ username, profile_image }: { username: string; profile_image?: string | null }) => {
            await axios.post(`/api/accounts/profile/${username}/follow`, { profile_image });
        },
        onSuccess: (_, { username }) => {
            queryClient.invalidateQueries({ queryKey: ["profile", username] });
            queryClient.invalidateQueries({ queryKey: ["profiles"] });
            queryClient.invalidateQueries({ queryKey: ["can-follow"] });
        },
    });
}

export function useUnfollowMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ username, profile_image }: { username: string; profile_image?: string | null }) => {
            await axios.post(`/api/accounts/profile/${username}/unfollow`, { profile_image });
        },
        onSuccess: (_, { username }) => {
            queryClient.invalidateQueries({ queryKey: ["profile", username] });
            queryClient.invalidateQueries({ queryKey: ["profiles"] });
            queryClient.invalidateQueries({ queryKey: ["can-follow"] });
        },
    });
}
