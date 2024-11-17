import { Box, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import TileGrid from "../components/tilegrid/TileGrid";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    } else {
      navigate("/login");
    }
  });

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#1A1A1A",
          minHeight: "100vh", // Full height for the page
        }}
      >
        <Navbar />
        <Box>
          <Box marginLeft={3} marginRight={3}></Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
