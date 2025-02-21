import React from "react";
import { useRouter } from "next/router";
import CategorySelect from "@/components/molecules/CategorySelect";
import TodoListContainer from "@/components/organism/TodoListContainer";
import Button from "@/components/atoms/Button";

const CategoryTodoListPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const handleCategoryChange = (selectedCategoryId) => {
    if (selectedCategoryId) {
      router.push(`/todolist/category?categoryId=${selectedCategoryId}`);
    } else {
      router.push("/todolist/category");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">To-Do List by Category</h1>

      {/* Category Selection Dropdown */}
      <CategorySelect value={categoryId} onChange={handleCategoryChange} />

      {/* Add New To-Do Button */}
      <div className="flex justify-end mb-4">
        <Button
          text="Add New To-Do"
          onClick={() => router.push("/todolist/new")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        />
      </div>

      {/* Todo List Container */}
      <TodoListContainer categoryId={categoryId} />
    </div>
  );
};

export default CategoryTodoListPage;
