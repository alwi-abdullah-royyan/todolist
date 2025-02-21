import React from "react";
import { useRouter } from "next/router";

import Button from "@/components/atoms/Button";
import PaginationControls from "@/components/molecules/PaginationControls";
import SearchBox from "@/components/molecules/SearchBox";
import Todolist from "@/components/organism/Todolist";

import { useFetchTodos } from "@/hooks/useFetchTodos";
import { useSearch } from "@/hooks/useSearch";
import { usePagination } from "@/hooks/usePagination";
import { handleDeleteSuccess } from "@/utils/handleDeleteSuccess";

const TodoListPage = () => {
  const router = useRouter();

  const { search, setSearch, handleSearch } = useSearch();
  const { page, setPage, handlePreviousPage, handleNextPage, resetPage } = usePagination();

  // Now setTodos is available from useFetchTodos!
  const { todos, setTodos, loading, totalPages } = useFetchTodos();

  // Correctly handle deletion by updating the todos state

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">To-Do List</h1>

      <SearchBox onSubmit={handleSearch} search={search} setSearch={setSearch} />

      <div className="flex justify-end gap-3 pb-5">
        <Button
          text="Add New To-Do"
          onClick={() => router.push("/todolist/new")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        />

        <Button
          text="Trash"
          onClick={() => router.push("/todolist/trash")}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-950 transition-colors"
        />
      </div>

      <Todolist
        todos={todos}
        onDelete={(deletedId) => handleDeleteSuccess(deletedId, setTodos, "Todo trashed!")}
        softDelete={true}
      />

      <PaginationControls
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TodoListPage;
