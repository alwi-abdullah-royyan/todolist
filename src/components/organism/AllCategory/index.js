// components/CategoryList.js
import React, { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import axios from "axios";
import Link from "next/link";

const AllCategory = () => {
  const categories = useCategories(); // Fetch categories using the custom hook
  const [deleting, setDeleting] = useState(null); // State to track deletion status
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setDeleting(id);

    try {
      await axios.delete(`${api}/todolist/category/${id}`);
      alert("Category deleted successfully.");
      window.location.reload(); // Refresh categories after deletion
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  if (!categories.length) {
    return <p className="text-gray-500 text-center">No categories available.</p>;
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-4">All Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="p-4 bg-gray-800 rounded-md shadow-md flex items-center justify-between">
            <p className="text-white font-medium">{category.name}</p>
            <div className="flex items-center gap-2">
              <Link
                href={`/todolist/dashboard/category/edit/${category.id}`}
                className="text-blue-400 hover:underline text-sm"
              >
                Edit
              </Link>
              <Link
                href={`/todolist/category?categoryId=${category.id}`}
                className="text-blue-400 hover:underline text-sm"
              >
                View
              </Link>
              <button
                onClick={() => handleDelete(category.id)}
                disabled={deleting === category.id}
                className="text-red-400 hover:text-red-600 transition-colors text-sm"
              >
                {deleting === category.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
