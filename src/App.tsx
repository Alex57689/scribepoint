import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import Login from "./pages/Login";
import Board from "./pages/Board";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/Board" element={<Board />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
