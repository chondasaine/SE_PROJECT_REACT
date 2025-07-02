import "./ConfirmationModal.css";

function ConfirmationModal({ onConfirm, onCancel, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <form className="modal__confirmation-form">
        <button
          type="button"
          onClick={onCancel}
          className="modal__close modal__close_confirmation"
        ></button>
        <div className="modal__confirmation-content">
          <p className="modal__confirmation-content-sure">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__confirmation-content-irreversible">
            This action is irreversible.
          </p>
          <div className="modal__confirmation-buttons">
            <button
              onClick={onConfirm}
              type="submit"
              className="modal__confirmation-button-delete"
            >
              Yes, delete item
            </button>
            <button
              onClick={onCancel}
              type="button"
              className="modal__confirmation-button-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ConfirmationModal;
