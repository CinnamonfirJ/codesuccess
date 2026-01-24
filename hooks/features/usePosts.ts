import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/app/types/post";

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = null }: { pageParam: string | null }) => {
      const { data } = await axios.get<{ results: PostType[]; next: string | null }>(
        `/api/posts${pageParam ? `?cursor=${pageParam}` : ""}`
      );
      return data;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      
      // Extract cursor from the next URL
      try {
        const nextUrl = new URL(lastPage.next);
        return nextUrl.searchParams.get("cursor");
      } catch (e) {
        return undefined;
      }
    },
  });
};
