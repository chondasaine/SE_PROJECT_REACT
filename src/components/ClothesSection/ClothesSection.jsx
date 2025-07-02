import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, weatherData, clothingItems }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData?.type
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__info">
        <p className="clothes-section__info-items">Your Items</p>
        <button className="clothes-section__info-button">+ Add New</button>
      </div>
      <ul className="clothes-section__items">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
