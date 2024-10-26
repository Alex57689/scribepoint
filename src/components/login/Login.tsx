import { Typography, Box, Container, TextField, Button } from "@mui/material";

const Login = () => {
  return (
    <Container
      maxWidth={"sm"}
      style={{
        padding: 0,
        backgroundColor: "#F9F9F9",
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "5rem",
          backgroundColor: "primary.main",
          borderTopRightRadius: "1rem",
          borderTopLeftRadius: "1rem",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h2"
          color="white"
          fontWeight={500}
        >
          Login
        </Typography>
      </Box>
      <form
        style={{
          marginTop: 50,
          marginBottom: 50,
          marginRight: 20,
          marginLeft: 20,
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          inputProps={{ "aria-label": "email address" }} // Improved accessibility
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          inputProps={{ "aria-label": "password" }} // Improved accessibility
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
