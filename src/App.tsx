import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<LoginPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
