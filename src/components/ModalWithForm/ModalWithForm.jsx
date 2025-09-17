import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseModal,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          onClick={handleCloseModal}
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-row">
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
