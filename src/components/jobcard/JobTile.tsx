import { Typography, Box, IconButton, Button, Tooltip } from "@mui/material";
import "./jobtile.css";
import { MoreVert } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

interface CardProp {
  id: number;
  cardTitle: string;
  cardDate: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    createdby: string;
    date: string;
  }[];
}

interface Card {
  card: CardProp;
}

const JobTile = ({ card }: Card) => {
  return (
    <div className="tile-container" key={card.id}>
      <div className="tile-title">
        <Typography fontWeight={700}>{card.cardTitle}</Typography>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>

      {card.tasks.map((task) => (
        <div key={task.id} className="tile-item">
          <Typography fontSize={14} fontWeight={400}>
            {task.title}
          </Typography>

          {task.description.length > 1 ? (
            <Tooltip title="This task has a description." arrow>
              <MenuIcon fontSize="small" className="tile-item-descicon" />
            </Tooltip>
          ) : (
            ""
          )}
        </div>
      ))}

      <div className="tile-addcard">
        <Button color="primary">
          <AddIcon /> <Typography fontWeight={500}>Add Item to Card</Typography>
        </Button>
      </div>
    </div>
  );
};

export default JobTile;
