// pages/todolist/dashboard/category/edit/[slug].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const EditCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  const api = process.env.NEXT_PUBLIC_API_TODOLIST;

  // Fetch category details on page load
  useEffect(() => {
    if (!slug) return;
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/todolist/category/id/${slug}`);
        const category = response.data.data || [];

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
  }, [slug, api]);

  // Handle category update
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
      await axios.put(`${api}/todolist/category/${slug}`, { name });
      setSuccess("Category updated successfully!");
      setTimeout(() => {
        router.push("/todolist/dashboard/category");
      }, 1000);
    } catch (err) {
      console.log("Failed to update category:", err);
      setError("Failed to update category. Make sure the category name is unique.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !name) {
    return <p className="text-gray-500 text-center">Loading category...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Category</h2>

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
          text={loading ? "Updating..." : "Update Category"}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        />
      </form>
    </div>
  );
};

export default EditCategory;
