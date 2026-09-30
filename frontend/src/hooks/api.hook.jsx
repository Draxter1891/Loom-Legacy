import api from "../api/axiosInstance";

const useApi = () => {
  const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response;
  };
  const loginUser = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  };
  const logoutUser = async () => {
    try {
      const response = await api.post("/auth/logout");
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response;
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
  }
};

export default useApi;
