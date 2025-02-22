import AllCategory from "@/components/organism/AllCategory";
import Todolist from "@/components/organism/Todolist";
import UserList from "@/components/organism/Users";
import { useFetchTodos } from "@/hooks/useFetchTodos";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getToken } from "@/services/auth";

const Dashboard = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { title, name } = router.query;

  // Fetching todos with the custom hook
  const { todos, loading: todosLoading, totalPages, page, setPage } = useFetchTodos(true);

  // Fetching users with the custom hook
  const { users, setUsers, loading: usersLoading, totalPages: usersTotalPages } = useFetchUsers(api, page, name);

  const token = getToken();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-bold text-blue-500 mb-6">Dashboard</h1>

      {/* Todos Section */}
      <h2 className="text-3xl font-bold text-blue-500 mb-6">All To-Do List</h2>
      <div className="md:max-h-72 max-h-96 overflow-auto">
        <Todolist todos={todos} loading={todosLoading} />
      </div>
      <div className="flex justify-between items-center py-4">
        <p>Total todolist: {totalPages * 5}</p>
        <Link
          href={`/todolist/dashboard/all-todolist`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          See All
        </Link>
      </div>

      {/* Categories Section */}
      <h2 className="text-3xl font-bold text-blue-500 mb-6">All Category</h2>
      <div className="md:max-h-72 max-h-96 overflow-auto">
        <AllCategory />
      </div>
      <div className="flex justify-end items-center py-4">
        <Link
          href={`/todolist/dashboard/category`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          See All
        </Link>
      </div>

      {/* Users Section */}
      <h2 className="text-3xl font-bold text-blue-500 mb-6">All users</h2>
      <div className="md:max-h-72 max-h-96 overflow-auto">
        <UserList token={token} pageSize={5} users={users} loading={usersLoading} setUser={setUsers} />
      </div>
      <div className="flex justify-end items-center py-4">
        <Link
          href={`/todolist/dashboard/users`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
