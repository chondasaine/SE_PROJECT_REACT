import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  weatherData,
  clothingItems,
  filteredItems,
  handleAddClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
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
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={filteredItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
