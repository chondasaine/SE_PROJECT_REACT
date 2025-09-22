import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext.jsx";
import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  weatherData,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  handleLogout,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const userItems = clothingItems.filter((item) => {
    return item.owner === currentUser?._id;
  });

  return (
    <div className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleLogout={handleLogout}
      />
      <section className="profile__clothes-items">
        <div className="profile-section__info">
          <p className="profile-section__info-items">Your Items</p>
          <button
            type="button"
            onClick={handleAddClick}
            className="profile-section__info-button"
          >
            + Add New
          </button>
        </div>
        <ClothesSection
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={userItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
