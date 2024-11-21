import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AppContextProvider } from "./hooks/AppContext.tsx";

const theme = createTheme({
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
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </StrictMode>
  </ThemeProvider>
);
