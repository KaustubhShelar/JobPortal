import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session and redirect to login page
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);
};

export default Logout;
