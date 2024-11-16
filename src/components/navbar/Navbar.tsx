import { Typography, AppBar, Toolbar, IconButton, Drawer } from "@mui/material";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerWidth = 240;

  const handleOpen = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            sx={{ marginRight: 1, color: "white" }}
            onClick={handleOpen}
          >
            <GiHamburgerMenu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Scribe Point
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#404040",
          },
        }}
        open={drawerOpen}
        variant="persistent"
      >
        <IconButton onClick={() => setDrawerOpen(false)}>Close</IconButton>
        <Typography sx={{ padding: 2 }}>Drawer content goes here.</Typography>
      </Drawer>
    </>
  );
};

export default Navbar;
