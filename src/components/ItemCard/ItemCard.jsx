import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const cardClick = () => {
    handleCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  const isLiked = item.likes.includes(currentUser?._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button--active" : ""
  }`;

  return (
    <li className="card" key={item._id}>
      <img
        onClick={cardClick}
        className="card__img"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__info">
        {currentUser._id && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            aria-label="Like item"
          ></button>
        )}
        <h2 className="card__name">{item.name}</h2>
      </div>
    </li>
  );
}

export default ItemCard;
