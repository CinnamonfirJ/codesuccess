"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/posts", { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to load posts", err))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading };
}
