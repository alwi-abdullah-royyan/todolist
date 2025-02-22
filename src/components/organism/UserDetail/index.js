import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";
import React from "react";

const UserDetails = ({ user, deleteError, deleteUser }) => {
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">User Details</h2>

      {user ? (
        <div className="space-y-4">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}{" "}
            {new Date(user.createdAt).toLocaleTimeString()}
          </p>
          <p>
            <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleDateString()}{" "}
            {new Date(user.updatedAt).toLocaleTimeString()}
          </p>

          <Button
            text="Edit User"
            type="button"
            onClick={() => router.push(`/todolist/dashboard/users/update/${user.username}`)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          />

          <Button
            text="Back to Users"
            type="button"
            onClick={() => router.push("/todolist/dashboard/users")}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          />

          {user.role !== "ADMIN" && (
            <Button
              text={"Delete User"}
              type="button"
              onClick={() => deleteUser(user.username)}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            />
          )}

          {deleteError && <p className="text-center text-red-500">{deleteError}</p>}
        </div>
      ) : (
        <p className="text-center text-gray-500">User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
