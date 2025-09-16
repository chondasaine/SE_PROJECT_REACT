import { useState } from "react";
import "./SideBar.css";

function SideBar({ currentUser, handleEditProfileClick, handleLogout }) {
  const [avatarError, setAvatarError] = useState(false);
  return (
    <div className="sidebar">
      <div className="sidebar__user-row">
        {currentUser?.avatar && !avatarError ? (
          <img
            className="sidebar__avatar"
            src={currentUser?.avatar}
            alt={currentUser?.name}
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="sidebar__avatar">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__actions"></div>
      <button className="sidebar__button" onClick={handleEditProfileClick}>
        Change profile data
      </button>
      <button className="sidebar__button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
