import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const api = process.env.NEXT_PUBLIC_API_TODOLIST;

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
      await axios.post(`${api}/todolist/category`, { name });
      setSuccess("Category added successfully!");
      setName("");
    } catch (err) {
      setError("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Category Name"
          name={"name"}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <Button
          text={loading ? "Adding..." : "Add Category"}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        />
      </form>
    </div>
  );
};

export default AddCategory;
