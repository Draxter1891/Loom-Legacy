import axios from "axios";

// Create a reusable Axios instance for API requests with cookie-based authentication. To prevent creating new axios instance of every render use useMemo

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default api;
