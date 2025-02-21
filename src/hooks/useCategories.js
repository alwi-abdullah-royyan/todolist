import { useState, useEffect } from "react";
import { fetchCategories } from "@/services/todoService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    loadCategories();
  }, []);

  return categories;
};
