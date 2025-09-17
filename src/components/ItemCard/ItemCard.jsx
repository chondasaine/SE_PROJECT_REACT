import "./ItemCard.css";

function ItemCard({ item, handleCardClick, handleCardDeletion }) {
  const cardClick = () => {
    handleCardClick(item);
  };
  return (
    <li className="card" key={item._id}>
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={cardClick}
        className="card__img"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
