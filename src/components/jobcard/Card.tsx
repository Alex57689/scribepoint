import {
  Typography,
  IconButton,
  Button,
  Tooltip,
  Modal,
  TextField,
  styled,
} from "@mui/material";
import "./Card.css";
import { MoreVert } from "@mui/icons-material";
import SubjectIcon from "@mui/icons-material/Subject";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useState } from "react";
import axios from "axios";

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
  activity?: string[];
  task_id: number;
  card_id: number;
  title: string;
  completed: boolean;
  position: number;
  created_at: Date;
  task_description: string;
};

interface Props {
  cardData: Card;
}

const CardTile = ({ cardData }: Props) => {
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
  });

  const handleEditCardClick = (id: number) => {
    setTaskDetailOpen(true);
    setTaskId(id);
  };

  const taskDetailHandleClose = () => {
    setTaskDetailOpen(false);
    setTaskId(null);
  };

  const handleCreateTaskClose = () => {
    setCreateTaskOpen(false);
  };

  const handleCreateCardClick = () => {
    setCreateTaskOpen(true);
  };

  const handleNewTaskChange = (e: any) => {
    const { name, value } = e.target;

    setNewTask((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNewTaskClick = () => {
    if (!newTask.title.trim()) {
      alert("Title and description are required.");
      return;
    }
    addNewTask();
    setNewTask({ title: "", desc: "" });
    setCreateTaskOpen(false);
  };

  const handleDeleteTaskClick = () => {
    deleteTask();
    taskDetailHandleClose();
  };

  const addNewTask = async () => {
    const data = {
      card_id: cardData.card_id,
      title: newTask.title,
      desc: newTask.desc,
    };
    await axios.post(`${import.meta.env.VITE_APP_API_ADDRESS}/task/`, data);
  };

  const deleteTask = async () => {
    const id = selectedTask?.task_id;
    console.log(id);
    axios.delete(`${import.meta.env.VITE_APP_API_ADDRESS}/task/${id}`);
  };

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
              {task.task_description ? (
                <SubjectIcon fontSize="small" className="tile-item-descicon" />
              ) : (
                <></>
              )}
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
        open={taskDetailOpen}
        onClose={taskDetailHandleClose}
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
                  in list <strong>{cardData.title}</strong>
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
                  <Typography>{selectedTask.task_description}</Typography>
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
                    <strong>{"selectedTask.createdby"}</strong> added this card
                    in
                    {cardData.title}
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {new Date(selectedTask.created_at).toLocaleDateString()}
                  </Typography>
                </div>
              </div>

              {/*selectedTask &&
                selectedTask.activity.map((activity: any) => (
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
                ))*/}
              <div className="buttonctn">
                <Button variant="outlined" onClick={handleDeleteTaskClick}>
                  Delete
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>

      {/* Modal for creating task */}
      <Modal
        open={createTaskOpen}
        onClose={handleCreateTaskClose}
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
            name="title"
            value={newTask.title}
            onChange={handleNewTaskChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            name="desc"
            fullWidth
            margin="normal"
            value={newTask.desc}
            onChange={handleNewTaskChange}
          />
          <Button
            onClick={handleNewTaskClick}
            variant="contained"
            color="primary"
          >
            Create Task
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CardTile;
