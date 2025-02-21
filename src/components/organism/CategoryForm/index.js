import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const CategoryForm = ({ slug }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const isEditMode = Boolean(slug);

  // Fetch category details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchCategory = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${api}/todolist/category/id/${slug}`);
          const category = response.data.data;
          if (category) {
            setName(category.name);
          } else {
            setError("Category not found.");
          }
        } catch (err) {
          console.log("Failed to fetch category:", err);
          setError("Failed to load category data.");
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, [slug, api, isEditMode]);

  // Handle form submission for both add and edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError("Category name cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(`${api}/todolist/category/${slug}`, { name });
        setSuccess("Category updated successfully!");
      } else {
        await axios.post(`${api}/todolist/category`, { name });
        setSuccess("Category added successfully!");
      }

      setTimeout(() => {
        router.push("/todolist/dashboard/category");
      }, 1000);
    } catch (err) {
      console.error("Failed to save category:", err);
      setError(
        isEditMode
          ? "Failed to update category. Ensure the name is unique."
          : "Failed to add category. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !name) {
    return <p className="text-gray-500 text-center">Loading category...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">{isEditMode ? "Edit Category" : "Add New Category"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Category Name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <Button
          text={loading ? (isEditMode ? "Updating..." : "Adding...") : isEditMode ? "Update Category" : "Add Category"}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        />
      </form>
    </div>
  );
};

export default CategoryForm;
