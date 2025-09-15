import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ClothesSection({ handleCardClick, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );
  return (
    <div className="clothes-section">
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
