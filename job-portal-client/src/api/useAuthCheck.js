import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UseAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  return null;

};

export default UseAuthCheck;
