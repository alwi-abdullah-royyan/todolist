import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createTodo, updateTodo, fetchTodoById } from "@/services/todoService";
import { getCurrentUser } from "@/services/auth";

export const useTodoForm = (mode = "create", todoId = null) => {
  const router = useRouter();
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: false,
    categoryId: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing To-Do data if in update mode
  useEffect(() => {
    const fetchTodo = async () => {
      if (mode === "update" && todoId) {
        setLoading(true);
        try {
          const data = await fetchTodoById(todoId);
          setFormData({
            title: data.title,
            description: data.description,
            isCompleted: data.completed,
            categoryId: data.category?.id || "",
          });
        } catch (error) {
          console.error("Failed to fetch To-Do data:", error);
          router.push("/todolist");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTodo();
  }, [mode, todoId, router]);

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

  // Form submission for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("username", user);
    data.append("isCompleted", formData.isCompleted);
    data.append("categoryId", formData.categoryId);
    if (image) {
      data.append("imagePath", image);
    }

    setLoading(true);
    try {
      if (mode === "create") {
        await createTodo(data);
      } else {
        await updateTodo(todoId, data);
      }
      router.push("/todolist");
    } catch (error) {
      console.log(`Failed to ${mode} To-Do:`, error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleImageChange,
    handleSubmit,
    loading,
  };
};
