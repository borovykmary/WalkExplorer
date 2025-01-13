import axios from "axios";

const API_URL = "http://localhost:8000";
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};
