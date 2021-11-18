import { useState } from "react";
import "./App.css";

//<a href='https://pngtree.com/so/camping'>camping png from pngtree.com/</a>
const cardImages = [
  {src: "/assets/game-item-1.png"},
  {src: "/assets/game-item-2.png"},
  {src: "/assets/game-item-3.png"},
  {src: "/assets/game-item-4.png"},
  {src: "/assets/game-item-5.png"},
  {src: "/assets/game-item-6.png"},
  {src: "/assets/game-item-7.png"},
  {src: "/assets/game-item-8.png"},
  {src: "/assets/game-item-9.png"},
  {src: "/assets/game-item-10.png"},
  {src: "/assets/game-item-11.png"},
  {src: "/assets/game-item-12.png"},
  {src: "/assets/game-item-13.png"},
  {src: "/assets/game-item-14.png"},
  {src: "/assets/game-item-15.png"},
  {src: "/assets/game-item-16.png"}
];
function App() {
  //state objects
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  //shuffle cards
  function shuffleCards(){
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(()=>Math.random() - 0.5)
      .map((card)=> ({ ...card, id: Math.random()}))

      setCards(shuffleCards);
      setTurns(0)
  }

  console.log("cards:", cards, "turns:", turns);
  return (
    <div className="App">
      <h4>Flip the Card</h4>
      <button onClick={shuffleCards}>Start a new game</button>
      
      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <div>
              <img className="front"  src={card.src} alt="card front"/>
              <img className="back" src="/assets/mystery-box.png" alt="card back"/>
            </div>
          </div>
        ))}
      
      </div>
    </div>
  );
}

export default App;
