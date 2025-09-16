import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ClothesSection({ handleCardClick, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <div className="clothes-section">
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
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
