import useSWR from "swr";
import axios from "axios";

const fetchTodosByCategory = async (user, categoryId, page) => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const response = await axios.get(
    `${api}/todolist/categoryAndUsername?categoryId=${categoryId}&username=${user}&page=${page}`
  );
  return response.data;
};

export const useGetTodosByCategory = (user, categoryId, page) => {
  const { data, error, isLoading } = useSWR(categoryId ? ["todos-by-category", user, categoryId, page] : null, () =>
    fetchTodosByCategory(user, categoryId, page)
  );

  return {
    todos: data?.data?.content || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    isError: error,
  };
};
