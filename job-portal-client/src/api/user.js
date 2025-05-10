import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const getUserByEmail = async (email) => {
    const url = `/email/${encodeURIComponent(email)}`;
    return await axios.get(`${API_URL}`+ url);
  };
  