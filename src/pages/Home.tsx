import { Box, Typography, Button } from "@mui/material";
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
            <Typography variant="h1" color="primary" margin={10}>
              Welcome to Scribe Point
            </Typography>
            <Box
              marginTop={5}
              display={"flex"}
              justifyContent={"space-between"}
              width={400}
            >
              <Button
                onClick={() =>
                  navigate("/login", { state: { action: "login" } })
                }
                size="large"
                sx={{ width: 150 }}
                variant="outlined"
              >
                Login
              </Button>
              <Button
                onClick={() =>
                  navigate("/login", { state: { action: "register" } })
                }
                sx={{ width: 150 }}
                variant="outlined"
              >
                Register
              </Button>
            </Box>

            <Typography variant="h5" color="primary" marginTop={10}>
              Your Ultimate Premium Project Management Tool!
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
