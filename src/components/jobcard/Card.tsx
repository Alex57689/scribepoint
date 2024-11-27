import {
  Typography,
  IconButton,
  Button,
  Tooltip,
  Modal,
  TextField,
} from "@mui/material";
import "./Card.css";
import { MoreVert } from "@mui/icons-material";
import SubjectIcon from "@mui/icons-material/Subject";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface Activity {
  id: number;
  createdBy: string;
  date: string;
  event: string;
}

type Card = {
  card_id: number;
  board_id: number;
  title: string;
  description: string;
  position: number;
  created_at: Date;
  due_date: Date;
  assigned_to: Array<string>;
  tasks: Array<Task>;
};

type Task = {
  task_id: number;
  card_id: number;
  title: string;
  completed: boolean;
  position: number;
  created_at: Date;
};

interface Props {
  cardData: Card;
}

const JobTile = ({ cardData }: Props) => {
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [createCardOpen, setCreateCardOpen] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const handleEditCardClick = (id: number) => {
    setTaskDetailOpen(true);
    setTaskId(id);
  };

  const taskDetailHandleClose = () => {
    setTaskDetailOpen(false);
    setTaskId(null);
  };

  const handleCreateCardClose = () => {
    setCreateCardOpen(false);
  };

  const handleCreateCardClick = () => {
    setCreateCardOpen(true);
  };

  const selectedTask = cardData.tasks.find((task) => task.task_id === taskId);

  return (
    <div className="tile-container" key={cardData.card_id}>
      <div className="tile-title">
        <Typography fontWeight={700}>{cardData.title}</Typography>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>

      {cardData.tasks.map((task) => (
        <div
          onClick={() => handleEditCardClick(task.task_id)}
          key={task.task_id}
          className="tile-item"
        >
          <Typography fontSize={14} fontWeight={400}>
            {task.title}
          </Typography>

          {task.title.length > 0 ? (
            <Tooltip title="This task has details." arrow>
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
      {/*<Modal
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
                <Typography variant="h6">Activity</Typography>
                <Button variant="contained" size="small">
                  Details
                </Button>
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
*/}
      {/* Modal for creating task */}
      <Modal
        open={createCardOpen}
        onClose={handleCreateCardClose}
        aria-labelledby="create-task-modal-title"
        aria-describedby="create-task-modal-description"
      >
        <div className="cardmodal">
          <Typography id="create-task-modal-title" variant="h6">
            Add a New Task
          </Typography>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary">
            Create Task
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default JobTile;
