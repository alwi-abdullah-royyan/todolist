import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { useRouter } from "next/router";
import React from "react";

const TodolistForm = ({
  handleSubmit,
  formData,
  handleChange = null,
  handleImageChange = null,
  categories,
  submitText = "Create ToDo",
}) => {
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        isRequired={true}
      />
      <textarea
        id="description"
        name="description"
        rows="5"
        cols="50"
        placeholder="description"
        onChange={handleChange}
        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2"
        required
        value={formData.description}
      ></textarea>

      {/* Category Dropdown */}
      <Select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        isRequired={true}
        choice={categories}
        initialText="Select Category"
      />

      <div className="flex items-center space-x-2">
        <Input
          type="checkbox"
          name="isCompleted"
          checked={formData.isCompleted}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label className="text-white">Completed</label>
      </div>

      <input
        type="file"
        name="imagePath"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />

      <div className="flex space-x-4">
        <Button
          text={submitText}
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        />
        <Button
          text="Cancel"
          type="button"
          onClick={() => router.push("/todolist")}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        />
      </div>
    </form>
  );
};

export default TodolistForm;
