import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  isOpen,
  handleCloseModal,
  onRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setImageUrl("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, avatar: imageUrl });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Avatar Url"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
    </ModalWithForm>
  );
}
