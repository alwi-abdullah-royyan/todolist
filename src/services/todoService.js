import axios from "axios";

const api = process.env.NEXT_PUBLIC_API_TODOLIST;

export const fetchTodos = async (title, page, user) => {
  try {
    const endpoint = title
      ? `${api}/todolist/search?title=${encodeURIComponent(title)}&page=${page}&size=5`
      : `${api}/todolist/${user}?page=${page}&size=5`;

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error; // Rethrow for error handling in the hook
  }
};

export const fetchCategories = async () => {
  const response = await axios.get(`${api}/todolist/category`);
  return response.data.data;
};

export const createTodo = async (data) => {
  await axios.post(`${api}/todolist`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchTodoById = async (id) => {
  const response = await axios.get(`${api}/todolist/id/${id}`);
  return response.data.data;
};

export const updateTodo = async (id, data) => {
  await axios.put(`${api}/todolist/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Soft Delete Function
export const softDeleteTodo = async (id) => {
  await axios.delete(`${api}/todolist/soft/${id}`);
};

// Hard Delete Function
export const hardDeleteTodo = async (id) => {
  await axios.delete(`${api}/todolist/${id}`);
};

// Fetch trashed todos
export const getTrashedTodos = async (user, search = "", page = 0) => {
  const response = await axios.get(`${api}/todolist/trashed/${user}`, {
    params: { search, page },
  });
  return response.data;
};
