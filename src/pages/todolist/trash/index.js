import React from "react";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button";
import PaginationControls from "@/components/molecules/PaginationControls";
import Todolist from "@/components/organism/Todolist";
import { useGetTrashedTodos } from "@/hooks/useGetTrashedTodos";
import { getCurrentUser } from "@/services/auth";
import { handleDeleteSuccess } from "@/utils/handleDeleteSuccess"; // Import the helper

const TrashPage = () => {
  const router = useRouter();
  const { title } = router.query;
  const user = getCurrentUser();

  const { todos, setTodos, isLoading, page, setPage, totalPages } = useGetTrashedTodos(user, title);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Trashed To-Do List</h1>

      <div className="flex justify-end mb-4">
        <Button
          text="Back"
          onClick={() => router.push("/todolist/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        />
      </div>

      <Todolist
        todos={todos}
        onDelete={(deletedId) => handleDeleteSuccess(deletedId, setTodos, "Todo deleted permanently!")}
        hardDelete={true}
      />

      <PaginationControls
        handleNextPage={() => setPage(page + 1)}
        handlePreviousPage={() => setPage(page - 1)}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TrashPage;
