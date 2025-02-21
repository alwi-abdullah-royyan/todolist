import { useState } from "react";
import axios from "axios";
import { getToken } from "@/services/auth";
import { useRouter } from "next/router";

export const useDeleteUser = (api) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const deleteUser = async (username) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      await axios.delete(`${api}/user/delete/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User deleted successfully!");
      router.push("/todolist/dashboard/users");
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};
