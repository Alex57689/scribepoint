import {
  Typography,
  IconButton,
  Button,
  Tooltip,
  Modal,
  TextField,
} from "@mui/material";
import "./jobtile.css";
import { MoreVert } from "@mui/icons-material";
import SubjectIcon from "@mui/icons-material/Subject";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useState } from "react";
import { styled } from "@mui/system";
interface Task {
  id: number;
  title: string;
  description: string;
  createdby: string;
  date: string;
  activity: Activity[];
}

interface Activity {
  id: number;
  createdBy: string;
  date: string;
  event: string;
}

interface CardProp {
  id: number;
  cardTitle: string;
  cardDate: string;
  tasks: Task[];
}

interface Card {
  card: CardProp;
}

const JobTile = ({ card }: Card) => {
  const [open, setOpen] = useState(false);
  const [createCardOpen, setCreateCardOpen] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const handleEditCardClick = (id: number) => {
    setOpen(true);
    setTaskId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskId(null);
  };
  const handleCreateCardClose = () => {
    setCreateCardOpen(false);
  };

  const handleCreateCardClick = () => {
    setCreateCardOpen(true);
  };

  // styled componenets

  const CommentBox = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      backgroundColor: "#ffffff",
      padding: "0",
      "& fieldset": {
        borderColor: "#ced4da",
      },
      "&:hover fieldset": {
        borderColor: "#b0b3b8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b0b3b8",
      },
    },
    "& .MuiInputBase-input": {
      padding: "10px 15px",
    },
  });

  // Find the task to display in the modal
  const selectedTask = card.tasks.find((task) => task.id === taskId);

  return (
    <div className="tile-container" key={card.id}>
      <div className="tile-title">
        <Typography fontWeight={700}>{card.cardTitle}</Typography>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>

      {card.tasks.map((task) => (
        <div
          onClick={() => handleEditCardClick(task.id)} // Use arrow function to pass the reference
          key={task.id}
          className="tile-item"
        >
          <Typography fontSize={14} fontWeight={400}>
            {task.title}
          </Typography>

          {task.description.length > 1 ? (
            <Tooltip title="This task has a description." arrow>
              <SubjectIcon fontSize="small" className="tile-item-descicon" />
            </Tooltip>
          ) : null}
        </div>
      ))}

      <div className="tile-addcard">
        <Button onClick={handleCreateCardClick} color="primary">
          <AddIcon /> <Typography fontWeight={500}>Add Item to Card</Typography>
        </Button>
      </div>

      {/* Modal for viewing task */}
      <Modal
        open={open}
        onClose={handleClose} // Correctly handle modal close
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="cardmodal">
          {selectedTask ? (
            <div className="editcardgrid">
              <SubjectIcon sx={{}} fontSize="medium" />

              <div className="editcardgridrow">
                <Typography marginBottom={1} variant="h5" fontWeight={700}>
                  {selectedTask.title}
                </Typography>
                <Typography fontSize={".8rem"}>
                  in list <strong>{card.cardTitle}</strong>
                </Typography>
              </div>
              <SubjectIcon sx={{}} fontSize="medium" />
              <div className="editcardgridrow">
                <div className="content">
                  <Typography variant="h6">Description</Typography>
                  <Button variant="contained" size="small">
                    Edit
                  </Button>
                </div>
                <div className="editcarddesc">
                  <Typography>{selectedTask.description}</Typography>
                </div>
              </div>
              <FormatListBulletedIcon
                sx={{ marginTop: 0.5 }}
                fontSize="medium"
              />
              <div className="editcardgridactivity">
                <Typography variant="h6" marginBottom={5}>
                  Activity
                </Typography>
              </div>
              <AccountCircleIcon
                color="primary"
                sx={{ marginRight: 1 }}
                fontSize="large"
              />

              <div className="editcardgridactivity">
                <CommentBox
                  fullWidth
                  name="comment"
                  placeholder="Write a comment..."
                />
              </div>

              <AccountCircleIcon
                color="primary"
                sx={{ marginRight: 1 }}
                fontSize="large"
              />
              <div className="editcardgridactivity">
                <div style={{ marginLeft: "0.5rem" }}>
                  <Typography fontSize={".9rem"}>
                    <strong>{selectedTask.createdby}</strong> added this card in
                    {card.cardTitle}
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {selectedTask.date}
                  </Typography>
                </div>
              </div>

              {selectedTask &&
                selectedTask.activity.map((activity) => (
                  <>
                    <AccountCircleIcon
                      color="primary"
                      sx={{ marginRight: 1 }}
                      fontSize="large"
                    />
                    <div className="editcardgridactivity" key={activity.id}>
                      <div style={{ marginLeft: "0.5rem" }}>
                        <Typography fontSize={".9rem"}>
                          <strong>{activity.createdBy}</strong> {activity.event}
                        </Typography>
                        <Typography fontSize={"0.8rem"}>
                          {activity.date}
                        </Typography>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          ) : null}
        </div>
      </Modal>

      {/* Modal for creating task */}
      <Modal
        open={createCardOpen}
        onClose={handleCreateCardClose} // Correctly handle modal close
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="cardmodal">
          {" "}
          this is some dummy info to see if this works
        </div>
      </Modal>
    </div>
  );
};

export default JobTile;
