import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button";
import PaginationControls from "@/components/molecules/PaginationControls";
import { getCurrentUser } from "@/services/auth";
import Todolist from "@/components/organism/Todolist";

const TodoListPageDashboard = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { title } = router.query;

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/todolist?page=${page}&size=10`);

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
      <h1 className="text-3xl font-bold text-blue-500 mb-6">All To-Do List</h1>

      {/* To-Do List */}
      <Todolist todos={todos} onDelete={handleDeleteSuccess} softDelete={true} />

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

export default TodoListPageDashboard;
