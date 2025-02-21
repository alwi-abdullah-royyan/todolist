import AllCategory from "@/components/organism/AllCategory";
import Todolist from "@/components/organism/Todolist";
import { getCurrentUser } from "@/services/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { title } = router.query;

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const user = getCurrentUser();
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/todolist?page=0&size=5`);

        setTodos(response.data.data);
        setTotalElements(response.data.totalElements || 0);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [api]);
  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl text-center font-bold text-blue-500 mb-6">Dashboard</h1>
        <h2 className="text-3xl font-bold text-blue-500 mb-6">All To-Do List</h2>
        <div className="md:max-h-72 max-h-96 overflow-auto">
          <Todolist todos={todos} loading={loading} />
        </div>
        <div className="flex justify-between items-center py-4">
          <div>
            <p>Total todolist: {totalElements}</p>
          </div>
          <div>
            <Link
              href={`/todolist/dashboard/all-todolist`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              See All
            </Link>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-blue-500 mb-6">All Category</h2>
        <div className="md:max-h-72 max-h-96 overflow-auto">
          <AllCategory />
        </div>
        <div className="flex justify-end items-center py-4">
          <div>
            <Link
              href={`/todolist/dashboard/category`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              See All
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
