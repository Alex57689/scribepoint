import { Box } from "@mui/material";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#1A1A1A",
          minHeight: "100vh", // Full height for the page
        }}
      >
        <Navbar />
      </Box>
    </>
  );
};

export default Home;
