import Button from "@/components/atoms/Button";
import PaginationControls from "@/components/molecules/PaginationControls";
import SearchBox from "@/components/molecules/SearchBox";
import UserList from "@/components/organism/Users";
import { getToken } from "@/services/auth";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const UsersPage = () => {
  const token = getToken();
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { name } = router.query;

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(name || "");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const endpoint = name
          ? `${api}/user/search/${encodeURIComponent(name)}`
          : `${api}/user/all?page=${page}&size=10`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        console.log(endpoint);

        setUsers(response.data.data.content);
        setTotalPages(response.data.data.totalPages || 1);
      } catch (error) {
        console.log("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [api, token, page, name]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); // Reset to the first page on new search
    if (search.trim()) {
      router.push(`?name=${encodeURIComponent(search)}`);
    } else {
      router.push("/todolist/dashboard/users"); // Reset to main page if search is empty
    }
  };
  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">All To-Do List</h1>
      <SearchBox onSubmit={handleSearch} search={search} setSearch={setSearch} category={false} />
      <div className="flex justify-end gap-3">
        {/* Add New To-Do Button */}
        <div className="flex justify-end mb-4">
          <Button
            text="Add New user"
            onClick={() => router.push("/todolist/dashboard/users/add")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          />
        </div>
      </div>
      <UserList token={token} users={users} />
      <PaginationControls
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default UsersPage;
