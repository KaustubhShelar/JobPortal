import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
// import Register from "../pages/Register";
import Jobs from "../pages/job/Jobs";
import PrivateRoute from "./PrivateRoute";
import Logout from "../pages/Logout";
import Applications from "../pages/application/Applications";
import SearchJobs from "../pages/job/SearchJobs";
import Profile from "../pages/user/Profile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/applications" element={<PrivateRoute><Applications /></PrivateRoute>} />
        <Route path="/search-jobs" element={<PrivateRoute><SearchJobs /></PrivateRoute>} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
