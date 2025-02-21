import { useEffect, useState } from "react";
import { getTrashedTodos } from "@/services/todoService";

export const useGetTrashedTodos = (user, search = "") => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await getTrashedTodos(user, search, page);
        setTodos(response.data || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [user, search, page]);

  return {
    todos,
    setTodos,
    page,
    setPage,
    totalPages,
    isLoading,
    isError,
  };
};
