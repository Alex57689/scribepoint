import { Box, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import WorkspaceBanner from "../components/workspacebanner/WorkspaceBanner";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  useEffect(() => {
    // Fetch workspaces when UID is available
    if (uid) {
      getWorkspaces(uid)
        .then((workspaces) => {
          setWorkspaces(workspaces);
        })
        .catch((error) => console.error("Error fetching workspaces:", error));
    }
  }, [uid]);

  // Fetch workspaces from the API
  const getWorkspaces = async (uid: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ADDRESS}/workspaces/${uid}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching workspaces:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1A1A1A",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h2"
          color="primary"
          sx={{
            marginTop: 2,
            fontSize: { xs: "2", md: "3.5rem" },
            textAlign: "center",
          }}
        >
          Your Dashboard
        </Typography>
        <WorkspaceBanner
          Title="Recently Viewed"
          recent={true}
          workspaceData={workspaces}
        />
        <WorkspaceBanner Title="Your Workspaces" workspaceData={workspaces} />
      </Box>
    </Box>
  );
};

export default Dashboard;
