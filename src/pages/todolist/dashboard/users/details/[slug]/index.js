import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/services/auth";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetchUserDetails(slug);
    }
  }, [slug]);

  // Fetch user details from API
  const fetchUserDetails = async (username) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8080/api/user/get/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
    } catch (err) {
      console.log("Failed to fetch user details:", err);
      setError("Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (e, username) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const token = getToken();

        await axios.delete(`http://localhost:8080/api/user/delete/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("User deleted successfully!");
        router.push("/todolist/dashboard/users");
      } catch (error) {
        console.log("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    }
  };
  if (loading) {
    return <p className="text-center text-gray-500">Loading user details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
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
            text="Edit user"
            type="button"
            onClick={() => router.push("/todolist/dashboard/users/update/" + user.username)}
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
              text="Delete User"
              type="button"
              onClick={(e) => handleDelete(e, user.username)}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            />
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
