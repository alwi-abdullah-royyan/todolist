import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { useTodoDetails } from "@/hooks/useTodoDetails";

const TodoDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;

  const { todo, loading } = useTodoDetails(slug);

  if (loading) return <p>Loading...</p>;

  if (!todo) return <p>Todo not found! Redirecting...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">{todo.title}</h1>
      <p className="text-gray-400 mb-4">{todo.description}</p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Category:</strong> {todo.category?.name || "No Category"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>By:</strong> {todo.username}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Created At:</strong> {new Date(todo.createdAt).toLocaleDateString()}
      </p>
      <p className={`text-sm font-bold mt-2 ${todo.completed ? "text-green-500" : "text-red-500"}`}>
        {todo.completed ? "Completed" : "Not Completed"}
      </p>

      {todo.imagePath && (
        <div className="mt-4">
          <Image
            width={500}
            height={500}
            src={`${api}/todolist/image/${todo.id}`}
            alt={todo.title}
            className="w-full max-w-md rounded-md"
          />
        </div>
      )}
      <div className="pt-5">
        <Button
          text="Back"
          type="button"
          onClick={() => router.back()}
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        />
      </div>
    </div>
  );
};

export default TodoDetailPage;
