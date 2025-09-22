import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function EditProfileModal({
  isOpen,
  handleCloseModal,
  onUpdateProfile,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [avatarError, setAvatarError] = useState(false);

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      setAvatarError(false);
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name <span className="modal__required">*</span>
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!name.trim() && <span className="modal__error">Name is required</span>}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL <span className="modal__required">*</span>
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={(e) => {
            const value = e.target.value;
            setAvatar(value);
            setAvatarError(!isValidUrl(value));
          }}
        />
        {avatarError && (
          <span className="modal__error">Please enter a valid URL</span>
        )}
      </label>
      <div className="modal__button-row">
        <button type="submit" className="modal__submit">
          Save Changes
        </button>
      </div>
    </ModalWithForm>
  );
}
