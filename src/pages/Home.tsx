import { Box } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import TileGrid from "../components/tilegrid/TileGrid";

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

        <Box width={"100%"}>
          <TileGrid />
          
        </Box>
      </Box>
    </>
  );
};

export default Home;
