import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Button,
  Box,
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
      console.log("User has been logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#E61F63" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box display="flex" alignItems="center">
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
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                flexGrow: 1,
              }}
            >
              Scribe Point
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="body1"
              color="inherit"
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Welcome, {user ? user.displayName : "Guest"}
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogOut}
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              Log out
            </Button>
          </Box>
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
            color: "white",
          },
        }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box textAlign={"center"} sx={{ padding: 2 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "white" }}
          >
            Close
          </IconButton>
          <Typography variant="h6" sx={{ marginTop: 2 }}></Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}></Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
