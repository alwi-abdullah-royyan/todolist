import React, { useState } from "react";
import { useGetTodosByCategory } from "@/hooks/useGetTodosByCategory";
import Todolist from "@/components/organism/Todolist";
import PaginationControls from "@/components/molecules/PaginationControls";
import { getCurrentUser } from "@/services/auth";

const TodoListContainer = ({ categoryId }) => {
  const [page, setPage] = useState(0);
  const user = getCurrentUser();

  const { todos, totalPages, isLoading, isError } = useGetTodosByCategory(user, categoryId, page);

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Failed to load todos.</p>;

  return (
    <>
      <Todolist todos={todos} />
      {todos.length > 0 && (
        <PaginationControls
          handleNextPage={() => setPage((prev) => prev + 1)}
          handlePreviousPage={() => setPage((prev) => Math.max(prev - 1, 0))}
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default TodoListContainer;
