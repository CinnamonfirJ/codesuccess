import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PostType, CommentType } from "@/app/types/post";

// Optimized comment processing function
const processComments = (data: CommentType[]): CommentType[] => {
  const commentsMap = new Map<number, CommentType>();
  const rootComments: CommentType[] = [];

  // First pass: Index comments
  data.forEach((comment) => {
    commentsMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: Build tree
  data.forEach((comment) => {
    const currentComment = commentsMap.get(comment.id);
    if (currentComment) {
      if (comment.parent && commentsMap.has(comment.parent)) {
        const parentComment = commentsMap.get(comment.parent);
        parentComment?.replies?.push(currentComment);
      } else {
        rootComments.push(currentComment);
      }
    }
  });

  // Sort function
  const sortComments = (arr: CommentType[]): CommentType[] => {
    return arr
      .sort(
        (a, b) =>
          new Date(b.commented_at).getTime() -
          new Date(a.commented_at).getTime()
      )
      .map((comment) => ({
        ...comment,
        replies: comment.replies ? sortComments(comment.replies) : [],
      }));
  };

  return sortComments(rootComments);
};

export function usePost(postId: string | number | null) {
  const queryClient = useQueryClient();
  const enabled = !!postId;

  // Fetch Post
  const postQuery = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data } = await axios.get<PostType>(`/api/posts/${postId}`);
      return data;
    },
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  // Fetch Comments
  const commentsQuery = useQuery({
    queryKey: ["post", postId, "comments"],
    queryFn: async () => {
      const { data } = await axios.get<CommentType[]>(
        `/api/posts/${postId}/comments`
      );
      return processComments(data);
    },
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  // Toggle Like Mutation
  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      if (!postId) return;
      await axios.post(`/api/posts/${postId}/like`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData<PostType>(["post", postId]);

      if (previousPost) {
        queryClient.setQueryData<PostType>(["post", postId], {
          ...previousPost,
          liked_by_user: !previousPost.liked_by_user,
          likes_count: previousPost.liked_by_user
            ? (previousPost.likes_count || 0) - 1
            : (previousPost.likes_count || 0) + 1,
        });
      }

      return { previousPost };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  // Add Comment Mutation
  const addCommentMutation = useMutation({
    mutationFn: async ({
      content,
      parent,
    }: {
      content: string;
      parent?: number;
    }) => {
      await axios.post(`/api/posts/${postId}/comments`, {
        content,
        post: postId,
        parent,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId, "comments"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] }); // Update comment count if available
    },
  });

  // Delete Post Mutation
  const deletePostMutation = useMutation({
    mutationFn: async () => {
      if (!postId) return;
      await axios.delete(`/api/posts/${postId}`);
    },
  });

  // Retweet Mutation
  const retweetMutation = useMutation({
    mutationFn: async (payload: {
      parent_post: string | number;
      is_retweet: boolean;
      body?: string;
      is_qoute_retweet?: boolean;
      quote_text?: string;
    }) => {
      await axios.post(`/api/posts/${postId}/retweets`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  return {
    post: postQuery.data,
    isLoadingPost: postQuery.isLoading,
    postError: postQuery.error,
    comments: commentsQuery.data,
    isLoadingComments: commentsQuery.isLoading,
    commentsError: commentsQuery.error,
    toggleLike: toggleLikeMutation.mutate,
    addComment: addCommentMutation.mutateAsync,
    isAddingComment: addCommentMutation.isPending,
    deletePost: deletePostMutation.mutateAsync,
    isDeletingPost: deletePostMutation.isPending,
    retweet: retweetMutation.mutateAsync,
    isRetweeting: retweetMutation.isPending,
  };
}
