import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import Login from "./pages/Login";
import Board from "./pages/Board";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./hooks/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <main>
        <ToastContainer />

        <Routes>
          <Route index element={<Home />}></Route>
          <Route
            path="/Board"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
