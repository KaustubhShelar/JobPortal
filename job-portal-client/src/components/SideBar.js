import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "View Profile", link: "/profile" },
    { text: "View Applications", link: "/applications" },
    { text: "Search Jobs", link: "/search-jobs" },
    { text: "Logout", link: "/logout" },
  ];

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem button onClick={() => (window.location.href = item.link)}>
                <ListItemText primary={item.text} />
              </ListItem>
              {index !== menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
