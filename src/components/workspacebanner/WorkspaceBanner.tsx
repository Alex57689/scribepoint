import { Box, Typography } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface Props {
  recent?: boolean;
  Title: string;
  workspaceData?: Array<{
    workspace_id: number;
    name: string;
    description: string;
    last_used_date: string;
  }>;
}

const WorkspaceBanner = ({ workspaceData, Title, recent }: Props) => {
  const navigate = useNavigate();

  // handle when the workspace tile is pressed
  const handleworkspaceselect = (id: number) => {
    console.log("workspace " + id + " pressed");
    navigate("/board", { state: { workspaceId: id } });
  };

  // Filter data to only render recenty viewed workspaces
  const recentViewDate = new Date();
  recentViewDate.setMonth(recentViewDate.getMonth() - 2);
  const filteredWorkspaces = workspaceData?.filter((workspaces) => {
    const lastUsedDate = new Date(workspaces.last_used_date);
    return lastUsedDate <= recentViewDate;
  });

  return (
    <Box
      sx={{
        width: "90%",
        margin: "0 auto", // Center on screen
        marginTop: 5,
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{
          color: "white",
          marginBottom: 2,
        }}
      >
        <IoTimeOutline fontSize={30} />
        <Typography
          variant="h5"
          sx={{
            marginLeft: 2,
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          {Title}
        </Typography>
      </Box>
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: "1.5rem",
        }}
      >
        {workspaceData?.length === 0 ? (
          <Box
            sx={{
              padding: 5,
              border: 2,
              boxShadow: 3,
              borderColor: "#E61F63",
              borderRadius: 1,
              backgroundColor: "#404040",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <Typography
              variant="h6"
              color="white"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              Create New Workspace <FaPlus />
            </Typography>
          </Box>
        ) : (
          <>
            {!recent
              ? workspaceData?.map((workspace) => (
                  <Box
                    onClick={() =>
                      handleworkspaceselect(workspace.workspace_id)
                    }
                    key={workspace.workspace_id}
                    sx={{
                      padding: 5,
                      border: 2,
                      boxShadow: 3,
                      borderColor: "#E61F63",
                      borderRadius: 1,
                      backgroundColor: "#404040",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="white"
                      sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                    >
                      {workspace.name}
                    </Typography>
                  </Box>
                ))
              : filteredWorkspaces?.map((workspace) => (
                  <Box
                    onClick={() =>
                      handleworkspaceselect(workspace.workspace_id)
                    }
                    key={workspace.workspace_id}
                    sx={{
                      padding: 5,
                      border: 2,
                      boxShadow: 3,
                      borderColor: "#E61F63",
                      borderRadius: 1,
                      backgroundColor: "#404040",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="white"
                      sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                    >
                      {workspace.name}
                    </Typography>
                  </Box>
                ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default WorkspaceBanner;
