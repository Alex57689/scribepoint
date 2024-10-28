import { useState } from "react";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Scribe Point
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "secondary.main", // Custom background color here
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: 5,
              marginLeft: 1,
            }}
          >
            <Typography variant="h6" sx={{ p: 2 }}>
              Projects
            </Typography>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Add sidebar items here */}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
