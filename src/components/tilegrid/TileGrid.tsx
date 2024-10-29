import JobTile from "../jobcard/JobTile";
import "./tilegrid.css";

const cards = [
  {
    id: 1,
    cardTitle: "To Do Backend",
    cardDate: "2023-10-29",
    tasks: [
      {
        id: 1,
        title: "do the dishes",
        description:
          "make sure all the dishes are done before mum gets home and gets angry at us",
        createdby: "alex the cool kid",
        date: "10/10/2027",
      },
      {
        id: 2,
        title: "run 10km",
        description: "run 10km fast",
        createdby: "alex the cool kid",
        date: "10/10/2022",
      },
      {
        id: 2,
        title: "Make dinner for the family",
        description: "",
        createdby: "alex the cool kid",
        date: "10/10/2022",
      },
    ],
  },
];
const TileGrid = () => {
  return (
    <div className="grid">
      {cards.map((card) => (
        <JobTile key={card.id} card={card} />
      ))}
    </div>
  );
};

export default TileGrid;
