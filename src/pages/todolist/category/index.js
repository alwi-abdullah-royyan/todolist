import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PaginationControls from "@/components/molecules/PaginationControls";
import Todolist from "@/components/organism/Todolist";
import Button from "@/components/atoms/Button";
import { getCurrentUser } from "@/services/auth";

const CategoryTodoListPage = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { categoryId } = router.query;

  const [categories, setCategories] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api}/todolist/category`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [api]);

  // Fetch todos by category
  useEffect(() => {
    if (!categoryId) return; // Do nothing if no category selected
    const user = getCurrentUser();

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/todolist/categoryAndUsername?cagetory=${categoryId}&username=${user}`);

        setTodos(response.data.data.content);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch todos by category:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [api, categoryId, page]);

  const handleCategoryChange = (e) => {
    setPage(0); // Reset pagination when category changes
    const selectedCategoryId = e.target.value;
    if (selectedCategoryId) {
      router.push(`/todolist/category?categoryId=${selectedCategoryId}`);
    } else {
      setTodos([]); // Clear todos when no category selected
      router.push("/todolist/category");
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">To-Do List by Category</h1>

      {/* Category Filter Dropdown */}
      <div className="mb-6">
        <select
          onChange={handleCategoryChange}
          value={categoryId || ""}
          className="p-2 border border-gray-300 rounded-md text-black"
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end mb-4">
        <Button
          text="Add New To-Do"
          onClick={() => router.push("/todolist/new")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        />
      </div>
      {/* To-Do List */}
      <Todolist todos={todos} />

      {/* Pagination Controls */}
      {todos.length > 0 && (
        <PaginationControls
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default CategoryTodoListPage;
