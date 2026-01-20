import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/app/types/post";

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get<PostType[]>(`/api/posts?page=${pageParam}&limit=20`);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};
