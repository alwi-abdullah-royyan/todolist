// hooks/useTodoDetails.js

import { useEffect, useState } from "react";
import axios from "axios";
import { parseSlugToId } from "@/utils/parseSlugToId";
import { useRouter } from "next/router";

export const useTodoDetails = (slug) => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchTodo = async () => {
      const numericId = parseSlugToId(slug);
      if (!numericId) {
        console.warn("Invalid ID, redirecting to /todolist");
        await router.push("/todolist");
        return;
      }

      try {
        const response = await axios.get(`${api}/todolist/id/${numericId}`);
        setTodo(response.data.data);
      } catch (error) {
        console.error("Failed to fetch todo:", error);
        await router.push("/todolist");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo().catch((e) => {
      console.error("Error in fetchTodo:", e);
      router.push("/todolist");
    });
  }, [slug, api, router]);

  return { todo, loading };
};
