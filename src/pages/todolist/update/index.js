import React from "react";
import { useRouter } from "next/router";
import { useTodoForm } from "@/hooks/useTodoForm";
import { useCategories } from "@/hooks/useCategories";
import TodolistForm from "@/components/organism/TodolistForm";

const UpdateTodoPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const categories = useCategories();
  const { formData, handleChange, handleImageChange, handleSubmit, loading } = useTodoForm("update", id);

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
