import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button";
import { getCurrentUser } from "@/services/auth";
import TodolistForm from "@/components/organism/TodolistForm";

const UpdateTodoPage = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { id } = router.query; // Get the ID from the query parameter

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
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [api]);

  // Fetch the existing todo data by ID
  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) {
        router.push("/todolist"); // Redirect if no ID is present
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${api}/todolist/id/${id}`);
        const data = response.data.data;
        setFormData({
          title: data.title,
          description: data.description,
          isCompleted: data.completed,
          categoryId: data.category?.id || "",
        });
      } catch (error) {
        console.error("Failed to fetch To-Do data:", error);
        router.push("/todolist"); // Redirect if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [api, id, router]);

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

  // Form submission for update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("username", user); // Use current user's username
    data.append("isCompleted", formData.isCompleted);
    data.append("categoryId", formData.categoryId);
    if (image) {
      data.append("imagePath", image);
    }

    setLoading(true);
    try {
      await axios.put(`${api}/todolist/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/todolist"); // Redirect to To-Do list page
    } catch (error) {
      console.error("Failed to update To-Do:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Update To-Do</h1>
      <TodolistForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        formData={formData}
        categories={categories}
        submitText="Update ToDo"
      />
    </div>
  );
};

export default UpdateTodoPage;
