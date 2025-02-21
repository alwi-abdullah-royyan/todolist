import React from "react";
import { useTodoForm } from "@/hooks/useTodoForm";
import { useCategories } from "@/hooks/useCategories";
import TodolistForm from "@/components/organism/TodolistForm";

const NewTodoPage = () => {
  const categories = useCategories();
  const { formData, handleChange, handleImageChange, handleSubmit, loading } = useTodoForm("create");

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
