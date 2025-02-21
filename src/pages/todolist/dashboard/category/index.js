import Button from "@/components/atoms/Button";
import AllCategory from "@/components/organism/AllCategory";
import { useRouter } from "next/router";
import React from "react";

const CategoryPage = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">All To-Do List</h1>
      <div className="flex justify-end gap-3">
        {/* Trash To-Do Button */}
        <div className="flex gap-4 justify-end mb-4">
          <Button
            text="Add new category"
            onClick={() => router.push("/todolist/dashboard/category/add")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-950 transition-colors"
          />
          <Button
            text="Back"
            onClick={() => router.back()}
            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-red-950 transition-colors"
          />
        </div>
      </div>
      <AllCategory />
    </div>
  );
};

export default CategoryPage;
