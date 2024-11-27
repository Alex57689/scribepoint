import { Box } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../hooks/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Loading from "../components/loading/Loading";
import axios from "axios";
import BoardGrid from "../components/boardgrid/BoardGrid";

type Board = {
  board_id: number;
  workspace_d: number;
  title: string;
  description: string;
  created_at: Date;
};

const Board = () => {
  const location = useLocation();
  const workspaceId = location.state ? location.state?.workspaceId : null;
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("UserComponent must be used within an AppContextProvider");
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    if (workspaceId) {
      getBoards(workspaceId)
        .then((boards) => {
          setBoards(boards);
          setSelectedBoard(boards?.[0]?.board_id);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching boards: ", error));
    }
  }, [workspaceId]);

  const getBoards = async (workspaceId: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ADDRESS}/board/${workspaceId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching workspace:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#1A1A1A",
          minHeight: "100vh",
        }}
      >
        <Navbar
          boardData={boards}
          currentBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
        />
        <Box>
          {loading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <Box marginLeft={3} marginRight={3}>
                <BoardGrid selectedBoard={selectedBoard} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Board;
