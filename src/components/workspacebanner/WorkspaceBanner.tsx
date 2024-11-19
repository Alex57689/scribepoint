import React from "react";
import { Box, Typography } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";

interface Props {
  Title: string;
  workspaceData?: Array<{
    workspace_id: number;
    name: string;
    description: string;
    last_used_date: string;
  }>;
}

const WorkspaceBanner = ({ workspaceData, Title }: Props) => {
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
        {workspaceData?.map((workspace) => (
          <Box
            key={workspace.workspace_id}
            onClick={() => console.log(`Clicked workspace: ${workspace.name}`)}
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
      </Box>
    </Box>
  );
};

export default WorkspaceBanner;
