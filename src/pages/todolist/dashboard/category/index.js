import AllCategory from "@/components/organism/AllCategory";
import React from "react";

const CategoryPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">All To-Do List</h1>
      <AllCategory />
    </div>
  );
};

export default CategoryPage;
