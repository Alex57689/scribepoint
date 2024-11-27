import { useContext, useEffect, useState } from "react";
import "./BoardGrid.css";
import { AppContext } from "../../hooks/AppContext";
import axios from "axios";
import Card from "../jobcard/Card";
import Loading from "../loading/Loading";

type Card = {
  card_id: number;
  board_id: number;
  title: string;
  description: string;
  position: number;
  created_at: Date;
  due_date: Date;
  assigned_to: Array<[]>;
  tasks: Array<[Task]>;
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
  selectedBoard: number;
}
const BoardGrid = ({ selectedBoard }: Props) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("userComponent muse be used within AppContextProvider");
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    setLoading(true);
    if (selectedBoard) {
      getCards(selectedBoard)
        .then((cards) => {
          setCards(cards);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching cards: ", error));
    }
  }, [selectedBoard]);

  const getCards = async (selectedBoard: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ADDRESS}/cards/${selectedBoard}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching cards",
        error.response?.data || error.message
      );
    }
  };
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="grid">
          {cards.map((card) => (
            <Card cardData={card} />
          ))}
        </div>
      )}
    </>
  );
};

export default BoardGrid;
