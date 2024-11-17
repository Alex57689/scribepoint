import { Box, Typography, Button } from "@mui/material";
import { BsPencilSquare } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#1A1A1A",
          minHeight: "100vh", // Full height for the page
        }}
      >
        ={" "}
        <Box>
          <Box
            width={"100wh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            marginLeft={3}
            marginTop={2}
            marginRight={3}
          >
            <Typography
              variant="h1"
              fontWeight={400}
              color="#E61F63"
              margin={10}
            >
              Welcome to Scribe Point
            </Typography>
            <Box
              marginTop={5}
              display={"flex"}
              justifyContent={"space-between"}
              width={500}
            >
              <Button
                onClick={() =>
                  navigate("/login", { state: { action: "login" } })
                }
                sx={{ width: 200 }}
                variant="outlined"
              >
                Login
              </Button>
              <Button
                onClick={() =>
                  navigate("/login", { state: { action: "register" } })
                }
                sx={{ width: 200, height: 60 }}
                variant="outlined"
              >
                Register
              </Button>
            </Box>

            <Typography variant="h5" color="primary" marginTop={10}>
              Your Ultimate Premium Project Management Tool!
            </Typography>

            <Box
              width={800}
              color={"#E61F63"}
              fontSize={150}
              fontWeight={10}
              marginTop={10}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <BsPencilSquare fontWeight={10} />
              <SlCalender />
              <FaClockRotateLeft />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
