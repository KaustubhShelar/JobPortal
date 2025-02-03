import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
// import Register from "../pages/Register";
import Jobs from "../pages/Jobs";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
