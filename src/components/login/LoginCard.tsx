import { Typography, Box, Container, TextField, Button } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Props {
  click: any;
}
const LoginCard = ({ click }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [action, setAction] = useState<string>(click);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: fname + " " + lname });
      navigate("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage + " " + errorCode);
      console.error("Error during signup:", error);
    }
  };

  const handleLoginIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = signInWithEmailAndPassword(auth, email, password);
      const user = (await userCredential).user;
      navigate("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage + " " + errorCode);
      console.error("Error during signup:", error);
    }
  };
  return (
    <Container
      maxWidth={"sm"}
      style={{
        padding: 0,
        backgroundColor: "#F9F9F9",
        borderRadius: "1rem",
      }}
    >
      {action === "login" ? (
        <>
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
            onSubmit={handleLoginIn}
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
              inputProps={{ "aria-label": "email address" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              inputProps={{ "aria-label": "password" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => setAction("register")}
              fullWidth
              variant="contained"
            >
              Register{" "}
            </Button>
          </form>
        </>
      ) : (
        <>
          {" "}
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
              Register
            </Typography>
          </Box>
          <form
            onSubmit={handleSignUp}
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
              label="First Name"
              autoComplete="First Name"
              autoFocus
              inputProps={{ "aria-label": "First Name" }}
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Last Name"
              autoComplete="Last Name"
              autoFocus
              inputProps={{ "aria-label": "Last Name" }}
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              inputProps={{ "aria-label": "email address" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              inputProps={{ "aria-label": "password" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register{" "}
            </Button>
            <Button
              onClick={() => setAction("login")}
              fullWidth
              variant="contained"
            >
              Already a member? Sign in
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default LoginCard;
