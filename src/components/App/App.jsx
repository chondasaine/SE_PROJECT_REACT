import { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";
import { getItems, saveItems, deleteItems } from "../../utils/API";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [cardToDeleteId, setCardToDeleteId] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const isOpen = (modal) => activeModal === modal;

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleDeleteRequest = (id) => {
    setCardToDeleteId(id);
    setActiveModal("deleteConfirmation");
  };

  const handleCancelDelete = () => {
    setCardToDeleteId(null);
    handleCloseModal();
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    saveItems({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Item failed to save: ", error);
      });
  };

  const handleCardDeletion = (e) => {
    e.preventDefault();

    if (!cardToDeleteId) {
      console.error("Nothing to delete");
      return;
    }

    deleteItems({ id: cardToDeleteId })
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDeleteId)
        );
        setCardToDeleteId(null);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Item failed to delete: ", error);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  const filteredItems = weatherData
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : [];

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={filteredItems}
                  handleAddClick={handleAddClick}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={filteredItems}
                  filteredItems={filteredItems}
                  handleAddClick={handleAddClick}
                />
              }
            ></Route>
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={isOpen("add-garment")}
          handleCloseModal={handleCloseModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          isOpen={isOpen("preview")}
          card={selectedCard}
          handleCloseModal={handleCloseModal}
          onRequestDelete={handleDeleteRequest}
        />

        <ConfirmationModal
          onConfirm={handleCardDeletion}
          onCancel={handleCancelDelete}
          isOpen={isOpen("deleteConfirmation")}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
