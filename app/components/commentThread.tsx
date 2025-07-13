import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type CommentType = {
  id: number;
  author_username: string;
  content: string;
  created_at: string;
  replies: CommentType[];
};

type CommentThreadProps = {
  postId: number;
  comments?: CommentType[];
};

export default function CommentThread({
  postId,
  comments = [],
}: CommentThreadProps) {
  const [localComments, setLocalComments] = useState<CommentType[]>(comments);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!comments.length) {
      fetch(`/api/posts/${postId}/comments`)
        .then((res) => res.json())
        .then((data) => setLocalComments(data));
    }
  }, [postId, comments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: postId,
          content: newComment,
          parent: 0, // assuming this is a top-level comment
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setLocalComments([data, ...localComments]);
        setNewComment("");
      } else {
        console.error("Failed to add comment", data);
      }
    } catch (err) {
      console.error("Error posting comment", err);
    } finally {
      setLoading(false);
    }
  };

  const renderReplies = (replies: CommentType[], depth = 1) => {
    return replies.map((reply) => (
      <div
        key={reply.id}
        className={`ml-${depth * 4} mt-2 border-l pl-3 border-gray-200`}
      >
        <div className='flex items-start gap-3'>
          <Avatar className='w-7 h-7'>
            <AvatarFallback>{reply.author_username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className='font-semibold text-sm'>{reply.author_username}</p>
            <p className='text-gray-700 text-sm'>{reply.content}</p>
            <p className='text-gray-400 text-xs'>
              {new Date(reply.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        {reply.replies?.length > 0 && renderReplies(reply.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <div className='space-y-4'>
      <div className='bg-gray-50 p-3 border rounded-md'>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='Write a comment...'
          rows={3}
          className='mb-2'
        />
        <Button
          onClick={handleAddComment}
          disabled={loading || !newComment.trim()}
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </div>

      {localComments.length === 0 ? (
        <p className='text-gray-500 text-sm'>No comments yet.</p>
      ) : (
        localComments.map((comment) => (
          <div key={comment.id} className='p-3 border rounded-md'>
            <div className='flex items-start gap-3'>
              <Avatar className='w-8 h-8'>
                <AvatarFallback>{comment.author_username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-semibold text-sm'>
                  {comment.author_username}
                </p>
                <p className='text-gray-700 text-sm'>{comment.content}</p>
                <p className='text-gray-400 text-xs'>
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            {comment.replies?.length > 0 && renderReplies(comment.replies)}
          </div>
        ))
      )}
    </div>
  );
}
