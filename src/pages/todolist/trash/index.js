import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button";
import PaginationControls from "@/components/molecules/PaginationControls";
import { getCurrentUser } from "@/services/auth";
import SearchBox from "@/components/molecules/SearchBox";
import Todolist from "@/components/organism/Todolist";

const TrashPage = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { title } = router.query;

  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState(title || "");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/todolist/trashed`);

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

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };
  const handleDeleteSuccess = (deletedId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deletedId));
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Trashed To-Do List</h1>
      <div className="flex justify-end gap-3">
        {/* Trash To-Do Button */}
        <div className="flex justify-end mb-4">
          <Button
            text="Trash"
            onClick={() => router.push("/todolist/trash")}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-950 transition-colors"
          />
        </div>
      </div>

      {/* To-Do List */}
      <Todolist todos={todos} onDelete={handleDeleteSuccess} hardDelete={true} />

      {/* Pagination Controls */}
      <PaginationControls
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TrashPage;
