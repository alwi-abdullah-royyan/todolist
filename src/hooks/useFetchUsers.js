import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "@/services/auth";

/**
 * Fetches user data based on pagination or a specific username.
 * @param {string} api - The base API URL.
 * @param {number} page - The current page for paginated requests.
 * @param {string} [name] - Optional name for searching users.
 * @param {string} [username] - Optional specific username to fetch a single user.
 * @returns {object} The fetched users, loading state, total pages, and potential errors.
 */
export const useFetchUsers = (api, page, name = null, username = null) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        let endpoint;
        if (username) {
          endpoint = `${api}/user/get/${encodeURIComponent(username)}`;
        } else if (name) {
          endpoint = `${api}/user/search/${encodeURIComponent(name)}`;
        } else {
          endpoint = `${api}/user/all?page=${page}&size=10`;
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;
        if (username) {
          setUsers([data]); // Single user as an array for consistency
        } else {
          setUsers(data.content || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    if (api) {
      fetchUsers();
    }
  }, [api, page, name, username, token]);

  return { users, loading, totalPages, error };
};
