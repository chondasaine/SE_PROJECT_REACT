import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  const cardClick = () => {
    handleCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={cardClick}
        className="card__img"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
