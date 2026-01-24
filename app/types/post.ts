export type CommentType = {
  id: number;
  post: number;
  author: number;
  author_username: string;
  author_image: string;
  content: string;
  commented_at: string;
  parent?: number | null;
  replies?: CommentType[];
};

export type OriginalPostType = {
  id: number;
  author: string | number;
  author_full_name: string;
  author_username: string;
  author_image: string;
  body: string;
  created_at: string;
  media?: string;
  retweet_count?: number;
};

export type PostType = {
  id: number;
  body: string;
  author: string | number;
  author_username: string;
  author_full_name: string;
  author_image: string;
  media?: string;
  media_type?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  isAffirmation?: boolean;
  liked_by_user?: boolean;
  likes_count?: number;
  comments_count?: number;
  shares?: number;
  timestamp?: string;
  is_retweet?: boolean;
  retweeted_by_user?: boolean;
  is_qoute_retweet?: boolean;
  quote_text?: string;
  scheduled_at?: string;
  retweet_count?: string;
  parent_post_data?: OriginalPostType;
  postType?: string;
};
