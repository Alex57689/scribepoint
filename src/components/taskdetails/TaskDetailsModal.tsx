import React from "react";
import {
  Modal,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const TaskDetailsModal = ({ open, handleClose, selectedTask, card }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {selectedTask ? (
          <Box className="editcardgrid">
            {/* Task Title and Associated List */}
            <Box className="editcardgridrow" mb={2}>
              <SubjectIcon sx={{ marginRight: 1 }} fontSize="medium" />
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {selectedTask.title}
                </Typography>
                <Typography fontSize={".8rem"}>
                  in list <strong>{card.cardTitle}</strong>
                </Typography>
              </Box>
            </Box>

            {/* Task Description */}
            <Box className="editcardgridrow" mb={2}>
              <SubjectIcon sx={{ marginRight: 1 }} fontSize="medium" />
              <Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="h6">Description</Typography>
                  <Button variant="contained" size="small" sx={{ ml: 2 }}>
                    Edit
                  </Button>
                </Box>
                <Typography>{selectedTask.description}</Typography>
              </Box>
            </Box>

            {/* Activity Header */}
            <Box className="editcardgridactivity" mb={2}>
              <FormatListBulletedIcon
                sx={{ marginRight: 1 }}
                fontSize="medium"
              />
              <Typography variant="h6">Activity</Typography>
              <Button variant="contained" size="small" sx={{ ml: 2 }}>
                Details
              </Button>
            </Box>

            {/* Comments Section */}
            <Box className="editcardgridactivity" mb={2}>
              <AccountCircleIcon
                color="primary"
                sx={{ marginRight: 1 }}
                fontSize="large"
              />
              <TextField
                fullWidth
                name="comment"
                placeholder="Write a comment..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    backgroundColor: "#ffffff",
                    padding: "0",
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 15px",
                  },
                }}
              />
            </Box>

            {/* Activity Log */}
            <Box>
              {selectedTask.activity.map((activity) => (
                <Box
                  key={activity.id}
                  display="flex"
                  alignItems="flex-start"
                  mb={2}
                >
                  <AccountCircleIcon
                    color="primary"
                    sx={{ marginRight: 1 }}
                    fontSize="large"
                  />
                  <Box>
                    <Typography fontSize={".9rem"}>
                      <strong>{activity.createdBy}</strong> {activity.event}
                    </Typography>
                    <Typography fontSize={"0.8rem"}>{activity.date}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography>No task selected</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default TaskDetailsModal;
