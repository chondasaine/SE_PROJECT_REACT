import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import "./Main.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section>
        <p className="itemCard__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          °{currentTemperatureUnit} / You may want to wear:
        </p>
        <ClothesSection
          handleCardClick={handleCardClick}
          weatherData={weatherData}
          clothingItems={clothingItems.filter(
            (item) => item.weather === weatherData?.type
          )}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </main>
  );
}
export default Main;
