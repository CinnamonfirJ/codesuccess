"use client";

import { toast } from "react-hot-toast";
import axios from "axios";

export const fetchPosts = async (
  setPosts: (data: any[]) => void,
  setLoading: (state: boolean) => void
) => {
  setLoading(true);
  try {
    const res = await axios.get("/api/posts", { withCredentials: true });
    setPosts(res.data);
  } catch {
    toast.error("Unable to fetch posts ❌");
  } finally {
    setLoading(false);
  }
};

export const createPost = async (
  data: { title: string; body: string; media?: string },
  onSuccess?: () => void
) => {
  try {
    await axios.post("/api/posts", data, { withCredentials: true });
    toast.success("Post created ✅");
    onSuccess?.();
  } catch (err: any) {
    toast.error(err.response?.data?.detail || "Post creation failed ❌");
  }
};

export const getPost = async (
  id: string | number,
  setPost: (data: any) => void,
  setLoading: (state: boolean) => void
) => {
  setLoading(true);
  try {
    const res = await axios.get(`/api/posts/${id}`, { withCredentials: true });
    setPost(res.data);
  } catch {
    toast.error("Post not found ❌");
  } finally {
    setLoading(false);
  }
};

export const updatePost = async (
  id: string | number,
  updatedData: { title: string; body: string; media?: string },
  onSuccess?: () => void
) => {
  try {
    await axios.put(`/api/posts/${id}`, updatedData, {
      withCredentials: true,
    });
    toast.success("Post updated ✅");
    onSuccess?.();
  } catch {
    toast.error("Post update failed ❌");
  }
};

export const deletePost = async (
  id: string | number,
  onSuccess?: () => void
) => {
  try {
    await axios.delete(`/api/posts/${id}`, {
      withCredentials: true,
    });
    toast.success("Post deleted ✅");
    onSuccess?.();
  } catch {
    toast.error("Delete failed ❌");
  }
};
