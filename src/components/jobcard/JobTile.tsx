import { Typography, Box, IconButton, Button } from "@mui/material";
import "./jobtile.css";
import { MoreVert } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  id: number;
  title: string;
  desc: string;
}
const JobTile = ({ id, title, desc }: Props) => {
  return (
    <div className="tile-container" key={id}>
      <div className="tile-title">
        <Typography fontWeight={700}>To Do Backend</Typography>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
      <div className="tile-item">
        <Typography fontSize={14} fontWeight={400}>
          Order Summary
        </Typography>
        <MenuIcon fontSize="small" className="tile-item-descicon" />
      </div>
      <div className="tile-item">
        <Typography fontSize={14} fontWeight={400}>
          Automate GCP Backup of DB
        </Typography>
        <MenuIcon fontSize="small" className="tile-item-descicon" />
      </div>
      <div className="tile-item">
        <Typography fontSize={14} fontWeight={400}>
          Multiple Images per Item
        </Typography>
        <MenuIcon fontSize="small" className="tile-item-descicon" />
      </div>
      <div className="tile-addcard">
        <Button color="primary">
          <AddIcon /> <Typography fontWeight={500}>Add Item to Card</Typography>
        </Button>
      </div>
    </div>
  );
};

export default JobTile;
