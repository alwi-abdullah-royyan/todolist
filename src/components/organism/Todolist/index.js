import Button from "@/components/atoms/Button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { slugify } from "@/utils/slugify";
import { softDeleteTodo, hardDeleteTodo } from "@/services/todoService";

const Todolist = ({ todos = [], onDelete, hardDelete = false, softDelete = false }) => {
  // Handler for Soft Delete
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this todo?")) {
      try {
        await softDeleteTodo(id);
        onDelete?.(id); // Optional chaining for callback
      } catch (error) {
        console.error("Failed to delete todo:", error);
        alert("Failed to delete todo. Please try again.");
      }
    }
  };

  // Handler for Hard Delete
  const handleDeletePermanent = async (e, id) => {
    e.preventDefault();
    if (confirm("Are you sure you want to permanently delete this todo?")) {
      try {
        await hardDeleteTodo(id);
        onDelete?.(id);
      } catch (error) {
        console.error("Failed to delete todo:", error);
        alert("Failed to delete todo. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-4">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo.id} className="p-4 bg-gray-900 shadow-md rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white">{todo.title}</h2>
            <p className="text-gray-400">
              {todo.description.length > 100 ? `${todo.description.slice(0, 100)} ......` : todo.description}
            </p>

            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Category:</strong>{" "}
                  {todo.category ? (
                    <Link
                      href={`/todolist/category?categoryId=${todo.category.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {todo.category.name}
                    </Link>
                  ) : (
                    "No Category"
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>By:</strong> {todo.username}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Created At:</strong> {new Date(todo.createdAt).toLocaleDateString()}
                </p>
                {todo.deletedAt && (
                  <p className="text-sm text-gray-500">Deleted At: {new Date(todo.deletedAt).toLocaleDateString()}</p>
                )}
                <p className={`text-sm font-bold mt-2 ${todo.completed ? "text-green-500" : "text-red-500"}`}>
                  {todo.completed ? "Completed" : "Not Completed"}
                </p>
              </div>

              {/* Image Section */}
              {todo.imagePath && (
                <div className="w-20 md:w-24">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_TODOLIST}/todolist/image/${todo.id}`}
                    alt={todo.title}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap w-full mt-4 gap-2">
              <Link
                href={`/todolist/update?id=${todo.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Update Todo
              </Link>

              <Link
                href={`/todolist/details/${todo.id}-${slugify(todo.title)}`}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                View Details
              </Link>

              {/* Delete Buttons */}
              {softDelete && (
                <Button
                  text="Delete"
                  onClick={(e) => handleDelete(e, todo.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-900 transition-colors"
                />
              )}
              {hardDelete && (
                <Button
                  text="Delete forever"
                  onClick={(e) => handleDeletePermanent(e, todo.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-900 transition-colors"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-xl mt-10">
          🚫 No todos available. Try adding a new task or adjusting your search/filter.
        </p>
      )}
    </div>
  );
};

export default Todolist;
