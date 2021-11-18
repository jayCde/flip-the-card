import "./SingleCard.css";

const CardComponent = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if(!disabled){
      handleChoice(card)
    }
  };
  return (
    <div>
      <div className="card">
        <div className={flipped ? "flipped": ""}>
          <img
            className="front"
            src={card.src}
            alt="card front"
          />
          <img
            className="back"
            src="/assets/mystery-box.png"
            alt="card back"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
