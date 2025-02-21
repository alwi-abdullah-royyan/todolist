import React from "react";
import { useCategories } from "@/hooks/useCategories";

const CategorySelect = ({ value, onChange }) => {
  const categories = useCategories();

  return (
    <div className="mb-6">
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value || ""}
        className="p-2 border border-gray-300 rounded-md text-black"
      >
        <option value="">Select a Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
