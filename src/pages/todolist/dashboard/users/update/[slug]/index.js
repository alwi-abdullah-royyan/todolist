import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { getToken } from "@/services/auth";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AdminUpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      const username = slug;
      fetchUserData(username);
    }
  }, [slug]);

  // Fetch user data from API
  const fetchUserData = async (username) => {
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8080/api/user/get/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data.data;
      setUsername(user.username || "");
      setEmail(user.email || "");
      setRole(user.role || "USER");
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setError("Failed to load user data");
    }
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password && password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    const payload = {
      username: username || null,
      email: email || null,
      password: password || null,
      role: role !== "ADMIN" ? role : "ADMIN", // Prevent role change if ADMIN
    };

    try {
      const token = getToken(); // Retrieve your auth token
      await axios.put(`http://localhost:8080/api/user/update/admin/${slug}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User updated successfully!");
      router.push("/todolist/dashboard/users"); // Redirect to user list or relevant page
    } catch (err) {
      console.error("Failed to update user", err);
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Update User Profile</h2>

      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

      <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <Input
        placeholder="Password (min 8 characters)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex flex-col">
        <label className="mb-2 text-sm text-gray-600">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={role === "ADMIN"}
          className="p-2 border rounded-md bg-gray-50"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      <Button
        text={loading ? "Updating..." : "Update"}
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      />
    </form>
  );
};

export default AdminUpdateProfile;
