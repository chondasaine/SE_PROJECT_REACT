import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function EditProfileModal({
  isOpen,
  handleCloseModal,
  onUpdateProfile,
  currentUser,
}) {
  const [name, setName] = useState(currentUser.name || "");
  const [avatar, setAvatar] = useState(currentUser.avatar || "");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}
