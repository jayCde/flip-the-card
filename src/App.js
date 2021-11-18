import { useEffect, useState } from "react";
import "./App.css";
import CardComponent from "./components/SingleCard";

//<a href='https://pngtree.com/so/camping'>camping png from pngtree.com/</a>
const cardImages = [
  { src: "/assets/game-item-1.png", matched: false },
  { src: "/assets/game-item-2.png", matched: false },
  { src: "/assets/game-item-3.png", matched: false },
  { src: "/assets/game-item-4.png", matched: false },
  { src: "/assets/game-item-5.png", matched: false },
  { src: "/assets/game-item-6.png", matched: false },
  { src: "/assets/game-item-7.png", matched: false },
  { src: "/assets/game-item-8.png", matched: false },
  { src: "/assets/game-item-9.png", matched: false },
  { src: "/assets/game-item-10.png", matched: false },
  { src: "/assets/game-item-11.png", matched: false },
  { src: "/assets/game-item-12.png", matched: false },
  { src: "/assets/game-item-13.png", matched: false },
  { src: "/assets/game-item-14.png", matched: false },
  { src: "/assets/game-item-15.png", matched: false },
  { src: "/assets/game-item-16.png", matched: false },
];
function App() {
  //state objects
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setgameOver] = useState(false);
  const [gameStatus, setgameStatus] = useState("Start A new game...");

  //shuffle cards
  function shuffleCards() {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  }

  //Launch game on page load
  useEffect(() => {
    shuffleCards();
  }, []);

  //Handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //Players progress / lifeline
  let playerLifelimit = `${Math.round((turns * 100) / cards.length)}%`;

  //component state comparisons
  useEffect(() => {
    //check for flipped cards match
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("cards match");
        resetTurn();
      } else {
        console.log("cards do not match");
        setTimeout(() => resetTurn(), 2000);
      }
    }
    //check for turns value and change game button status
    if (turns > 0) {
      setgameStatus("Reset board...");
    }

    //check if player exhausted life limit
    if (playerLifelimit === "100%") {
      setgameOver(true);
      setDisabled(true);
      setgameStatus("Play Again");
    }
  }, [choiceOne, choiceTwo, playerLifelimit, turns]);

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
    setgameOver(false);
  };

  return (
    <div className="App">
      <h4>Flip the Card</h4>
      <button className="btn-start-game" onClick={shuffleCards}>
        {gameStatus}
      </button>

      {/*Display game over modal based on condition*/}
      {gameOver === true && (
        <div
          style={{ marginLeft: "50px" }}
          type="button"
          class="btn btn-primary position-relative"
        >
          Score
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            99+
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
      )}

      {/*Total activities in current game mode*/}
      <p className="">
        Total number of turns: {turns}/ {cards.length}
      </p>

      {/*Player life degrade simulation*/}
      <div className="progress">
        <div
          style={{ width: playerLifelimit }}
          class="progress-bar bg-danger"
          role="progressbar"
          aria-valuenow={playerLifelimit}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <span>{playerLifelimit}</span>
      </div>

      {/*Puzzle cards*/}
      <div className="card-grid">
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
