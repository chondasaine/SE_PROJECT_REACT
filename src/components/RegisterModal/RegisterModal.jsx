import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  isOpen,
  handleCloseModal,
  onRegister,
  handleSwitchToLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [avatarError, setAvatarError] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Invalid email format");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      value.length >= 6 ? "" : "Password must be at least 6 characters"
    );
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value.trim() ? "" : "Name is required");
  };
  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);
    try {
      new URL(value);
      setAvatarError(false);
    } catch {
      setAvatarError(true);
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setImageUrl("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (!password.trim() || password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!name.trim()) {
      setNameError("Name is required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!imageUrl.trim()) {
      setAvatarError(true);
      hasError = true;
    } else {
      try {
        new URL(imageUrl);
        setAvatarError(false);
      } catch {
        setAvatarError(true);
        hasError = true;
      }
    }

    if (hasError) return;

    onRegister({ email, password, name, avatar: imageUrl });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email <span className="modal__required">*</span>
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <span className="modal__error">{emailError}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password <span className="modal__required">*</span>
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <span className="modal__error">{passwordError}</span>}
      </label>
      <label htmlFor="name" className="modal__label">
        Name <span className="modal__required">*</span>
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
        {nameError && <span className="modal__error">{nameError}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Avatar URL <span className="modal__required">*</span>
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Avatar Url"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
        {avatarError && (
          <span className="modal__error">Please enter a valid URL</span>
        )}
      </label>
      <div className="modal__button-group">
        <button type="submit" className="modal__submit modal__submit-primary">
          Sign Up
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-secondary"
          onClick={handleSwitchToLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
