import { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import { Routes, Route, Navigate } from "react-router-dom";
import { getItems, saveItems, deleteItems } from "../../utils/API";
import { registerUser, loginUser, checkToken } from "../../utils/auth";
import { useContext } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const isOpen = (modal) => activeModal === modal;
  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  const handleCloseRegisterModal = () => setRegisterModalOpen(false);
  const handleCloseLoginModal = () => setLoginModalOpen(false);

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
    const token = localStorage.getItem("jwt");
    saveItems({ name, imageUrl, weather }, token)
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
    const token = localStorage.getItem("jwt");
    if (!cardToDeleteId) {
      console.error("Nothing to delete");
      return;
    }

    deleteItems({ id: cardToDeleteId }, token)
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

  const handleRegister = (data) => {
    registerUser(data)
      .then((res) => {
        console.log("Registered:", res);
        setIsLoggedIn(true);
        setRegisterModalOpen(false);
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  const handleLogin = (data) => {
    loginUser(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setLoginModalOpen(false);
        } else {
          console.error("No token received:", err);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("token check failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const filteredItems = weatherData
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : [];

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLogIn={handleLoginClick}
              onRegister={handleRegisterClick}
            />
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={filteredItems}
                      filteredItems={filteredItems}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" />
                  ) : (
                    <Navigate to="/login" />
                  )
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
          <RegisterModal
            isOpen={isRegisterModalOpen}
            handleCloseModal={handleCloseRegisterModal}
            onRegister={handleRegister}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            handleCloseModal={handleCloseLoginModal}
            onLogIn={handleLogin}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
