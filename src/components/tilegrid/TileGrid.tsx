import JobTile from "../jobcard/JobTile";
import "./tilegrid.css";

const tasks = [
  {
    id: 1,
    cardName: "card 1",
    task1: "Design a simple to do application",
    task2: "Dont do the dishes",
  },
  {
    id: 2,
    cardName: "card 2",
    task1: "Do the dishes",
    task2: "Dont do the dishes",
  },
  {
    id: 3,
    cardName: "card 3",
    task1: "Move to mars",
    task2: "Dont do the dishes",
  },
  {
    id: 3,
    cardName: "card 3",
    task1: "Move to mars",
    task2: "Dont do the dishes",
  },
  {
    id: 3,
    cardName: "card 3",
    task1: "Move to mars",
    task2: "Dont do the dishes",
  },
  {
    id: 3,
    cardName: "card 3",
    task1: "Move to mars",
    task2: "Dont do the dishes",
  },
];
const TileGrid = () => {
  return (
    <div className="grid">
      {tasks.map((card) => (
        <JobTile id={card.id} title={card.cardName} desc={card.task1} />
      ))}
    </div>
  );
};

export default TileGrid;
