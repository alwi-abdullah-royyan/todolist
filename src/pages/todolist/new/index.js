import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button";
import { getCurrentUser } from "@/services/auth";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TodolistForm from "@/components/organism/TodolistForm";

const NewTodoPage = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();

  // Get the current user
  const user = getCurrentUser();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: false,
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api}/todolist/category`);
        setCategories(response.data.data || []);
      } catch (error) {
        console.log("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [api]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("username", user); // Automatically use the current user's username
    data.append("isCompleted", formData.isCompleted);
    data.append("categoryId", formData.categoryId);
    if (image) {
      data.append("imagePath", image);
    }

    setLoading(true);
    try {
      await axios.post(`${api}/todolist`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/todolist"); // Redirect to To-Do list page
    } catch (error) {
      console.error("Failed to create To-Do:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Add New To-Do</h1>
      <TodolistForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        formData={formData}
        categories={categories}
      />
    </div>
  );
};

export default NewTodoPage;
