import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  const { email, password } = credentials;
  const url = `/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  return await axios.post(`${API_URL}`+ url);
};
