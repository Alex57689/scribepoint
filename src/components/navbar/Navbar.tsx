import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Button,
} from "@mui/material";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerWidth = 240;
  const user = auth.currentUser;
  const navigate = useNavigate();
  const handleOpen = () => {
    setDrawerOpen(true);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("user has been logged out");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            sx={{ marginRight: 1, color: "white" }}
            onClick={handleOpen}
            aria-label="Open menu"
          >
            <GiHamburgerMenu />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }} // Ensures the title takes up remaining space
          >
            Scribe Point
          </Typography>
          <Typography variant="h6" color="inherit">
            Welcome, {user ? user.displayName : "error"}
          </Typography>
          <Button color="inherit" onClick={() => handleLogOut()}>
            Log out
          </Button>
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
