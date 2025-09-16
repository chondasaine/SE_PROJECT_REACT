import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext, useState } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onRegister,
  onLogIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = useContext(CurrentUserContext);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__toggle-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar && !avatarError ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button onClick={onRegister} className="header__auth-btn">
              Sign Up
            </button>
            <button onClick={onLogIn} className="header__auth-btn">
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
