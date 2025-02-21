import axios from "axios";
import { jwtDecode } from "jwt-decode";
const api = process.env.NEXT_PUBLIC_API_TODOLIST;

export const login = async (payload) => {
  try {
    const response = await axios.post(`${api}/user/login`, payload);

    return { status: true, token: response.data.data };
  } catch (err) {
    console.log("Login failed : ", err);
    return { status: false, error: err };
  }
};

export const register = async (payload) => {
  try {
    const response = await axios.post(`${api}/user/register`, payload);
    return { status: true, token: response.data.data };
  } catch (err) {
    console.log("Register failed : ", err);
    return { status: false, error: err };
  }
};

// Get Token from Storage
export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

// Get the Current User from the Token
export function getCurrentUser() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.sub || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// Check if User is Authenticated
export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // Check if Token is Expired
    if (decoded.exp * 1000 < Date.now()) {
      logout(); // Remove token if expired
      return false;
    }
    return true;
  } catch (err) {
    console.error("Authentication check failed:", err);
    return false;
  }
}
export function isAdminUser() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    return decoded.isAdmin === true; // Check if isAdmin is true
  } catch (err) {
    console.error("Admin check failed:", err);
    return false;
  }
}

// Handle Logout
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Optional: Redirect to login page
}
