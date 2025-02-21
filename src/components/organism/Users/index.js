import Button from "@/components/atoms/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ token, pageSize = 10, users }) => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const handleDelete = async (e, username) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        console.log(`${api}/user/delete/${username}`);
        console.log(token);

        await axios.delete(`${api}/user/delete/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUsers(page); // Refresh user list after deletion
      } catch (error) {
        console.log("Failed to delete user:", error);
        alert("Failed to delete user. .");
      }
    }
  };

  return (
    <>
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.username} className="p-4 bg-gray-900 shadow-md rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-white">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Role:</strong> {user.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap w-full mt-4 gap-2">
                <Link
                  href={`/todolist/dashboard/users/details/${user.username}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  View Details
                </Link>

                {user.role !== "ADMIN" && (
                  <Button
                    text="Delete"
                    onClick={(e) => handleDelete(e, user.username)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-900 transition-colors"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xl mt-10">
            🚫 No users available. try add user or adjust search.
          </p>
        )}
      </div>
    </>
  );
};

export default UserList;
