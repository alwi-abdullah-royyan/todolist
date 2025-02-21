import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { getCurrentUser, logout } from "@/services/auth"; // Add logout import
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // For redirection
import axios from "axios";

const UserUpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    setUsername(getCurrentUser());
  }, []);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      username: username,
      password: password,
    };

    try {
      await axios.put(`http://localhost:8080/api/user/update/${username}`, payload);

      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Clear auth data and trigger authChange event
    window.dispatchEvent(new Event("authChange")); // Notify the app of the change
    router.push("/login"); // Optional: Redirect to the login page
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <Input
        name={"username"}
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
        name={"password"}
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      <Button
        text="Update"
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      />

      {/* Logout Button */}
      <Button
        text="Logout"
        type="button"
        onClick={handleLogout}
        className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
      />
    </form>
  );
};

export default UserUpdateProfile;
