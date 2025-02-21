import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/services/auth";

export const useFetchTodos = (all = false) => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { title } = router.query;

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(0);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const endpoint = all
          ? `${api}/todolist?page=0&size=5`
          : title
          ? `${api}/todolist/search?title=${encodeURIComponent(title)}&page=${page}&size=5`
          : `${api}/todolist/${user}?page=${page}&size=5`;

        const response = await axios.get(endpoint);
        setTodos(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [api, title, page, user]);

  return { todos, setTodos, loading, totalPages, page, setPage };
};
