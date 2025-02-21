// components/CategoryList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api}/todolist/category`);

        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        alert("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [api]);

  if (loading) {
    return <p className="text-gray-500 text-center">Loading categories...</p>;
  }

  if (categories.length === 0) {
    return <p className="text-gray-500 text-center">No categories available.</p>;
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-4">All categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="p-4 bg-gray-800 rounded-md shadow-md flex items-center justify-between">
            <p className="text-white font-medium">{category.name}</p>
            <Link
              href={`/todolist/category?categoryId=${category.id}`}
              className="text-blue-400 hover:underline text-sm"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
