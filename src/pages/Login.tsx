import { Typography, Box, Container } from "@mui/material";
import LoginCard from "../components/login/LoginCard";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const Login = () => {
  const location = useLocation();
  const action = location.state ? location.state?.action : "login";

  return (
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
      <LoginCard click={action} />
    </Box>
  );
};

export default Login;
