import { Typography, Box, Container } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#1A1A1A",
          minHeight: "100vh", // Full height for the page
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            padding: 3,
            borderRadius: 2,
            position: "absolute",
            top: 0,
          }}
        >
          <Typography variant="h1" fontWeight={500} color="primary">
            Scribe Point
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;
