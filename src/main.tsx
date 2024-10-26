import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createMuiTheme, ThemeProvider } from "@mui/material";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#E61F63" },
    secondary: { main: "#FF8BA3" },
  },
  typography: {
    fontFamily: "Raleway",
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
