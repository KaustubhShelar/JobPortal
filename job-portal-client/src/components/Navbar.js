import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Sidebar/>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        {/* <Button color="inherit" onClick={() => navigate("/job")}>Jobs</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
