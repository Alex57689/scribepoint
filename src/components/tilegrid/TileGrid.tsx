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
        title: "Do The Dishes",
        description:
          "Make sure all the dishes are done before mum gets home and gets angry at us",
        createdby: "Alex Costello",
        date: "10/10/2027",
        activity: [
          {
            id: 1,
            createdBy: "Alex Costello",
            date: "10/12/2027",
            event: "added to the main TSX file",
          },
        ],
      },
      {
        id: 2,
        title: "Run 10km",
        description: "Run 10km really fast",
        createdby: "Alex Costello",
        date: "10/10/2022",
        activity: [
          {
            id: 1,
            createdBy: "Alex Costello",
            date: "10/12/2027",
            event: "added to the main TSX file",
          },
        ],
      },
      {
        id: 3, // Updated unique id
        title: "Make dinner for the family",
        description: "",
        createdby: "Alex Costello",
        date: "10/10/2022",
        activity: [], // Empty activity array
      },
    ],
  },
  {
    id: 2,
    cardTitle: "To Do Frontend",
    cardDate: "2022-10-24",
    tasks: [
      {
        id: 4, // Updated unique id
        title: "Create The Home Page",
        description:
          "Create a responsive home page that will work on all platforms",
        createdby: "Alex Costello",
        date: "14/11/2026",
        activity: [
          {
            id: 1,
            createdBy: "Alex Costello",
            date: "10/12/2027",
            event: "added to the main TSX file",
          },
        ],
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
