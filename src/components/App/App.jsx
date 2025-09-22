import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  getItems,
  saveItems,
  deleteItems,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  getUserData,
} from "../../utils/api.js";
import { registerUser, loginUser, checkToken } from "../../utils/auth";
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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error("token check failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserData(token)
        .then(setCurrentUser)
        .catch((err) => {
          console.error("Failed to fetch user data:", err.message);
        });
    }
  }, [token]);

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

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
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
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    handleCloseModal();
  };

  const handleSwitchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const handleSwitchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
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

    deleteItems(cardToDeleteId, token)
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
      .then(() => {
        return loginUser({ email: data.email, password: data.password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserProfile(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setRegisterModalOpen(false);
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  const handleLogin = (data) => {
    return loginUser(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setLoginModalOpen(false);
          return checkToken(res.token);
        } else {
          throw new Error("No token received");
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        throw err;
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.includes(currentUser._id);

    const request = isLiked
      ? removeCardLike(_id, token)
      : addCardLike(_id, token);
    request
      .then((res) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === res._id ? res : item))
        );
      })
      .catch((err) => console.error("Like toggle failed:", err));
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

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
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
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onCardLike={handleCardLike}
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
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleLogout={handleLogout}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
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
            handleSwitchToLogin={handleSwitchToLogin}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            handleCloseModal={handleCloseLoginModal}
            onLogIn={handleLogin}
            handleSwitchToRegister={handleSwitchToRegister}
          />
          <EditProfileModal
            isOpen={isOpen("edit-profile")}
            handleCloseModal={handleCloseModal}
            setCurrentUser={setCurrentUser}
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
