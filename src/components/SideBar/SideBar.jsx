import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext.jsx";
import { useState } from "react";
import "./SideBar.css";

function SideBar({ handleEditProfileClick, handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [avatarError, setAvatarError] = useState(false);

  if (!currentUser) return null;

  return (
    <div className="sidebar">
      <div className="sidebar__edit-profile">
        {currentUser?.avatar && !avatarError ? (
          <img
            className="sidebar__avatar"
            src={currentUser?.avatar}
            alt={currentUser?.name}
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__actions">
        <button className="sidebar__button" onClick={handleEditProfileClick}>
          Change profile data
        </button>
        <button className="sidebar__button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
