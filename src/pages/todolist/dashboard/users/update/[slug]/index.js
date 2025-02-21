import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { getToken } from "@/services/auth";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AdminUpdateProfile = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  const { users, loading: userLoading, error: fetchError } = useFetchUsers(api, 0, null, slug);

  useEffect(() => {
    if (users.length > 0) {
      const user = users[0];
      setUsername(user.username || "");
      setEmail(user.email || "");
      setRole(user.role || "USER");
    }
    if (fetchError) {
      setError(fetchError);
    }
  }, [users, fetchError]);

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
      role: role !== "ADMIN" ? role : "ADMIN",
    };

    try {
      const token = getToken();
      await axios.put(`${api}/user/update/admin/${slug}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User updated successfully!");
      router.push("/todolist/dashboard/users");
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
        text={loading || userLoading ? "Updating..." : "Update"}
        type="submit"
        disabled={loading || userLoading}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      />
    </form>
  );
};

export default AdminUpdateProfile;
