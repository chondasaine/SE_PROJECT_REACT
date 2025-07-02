import "./ItemModal.css";

function ItemModal({ isOpen, handleCloseModal, card, onRequestDelete }) {
  console.log("Card passed to modal:", card);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_img">
        <button
          type="button"
          onClick={handleCloseModal}
          className="modal__close modal__close_itm"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__img" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <button
            type="button"
            className="modal__delete-button"
            onClick={() => onRequestDelete(card._id)}
          >
            Delete Item
          </button>
        </div>
        <div className="modal__footer modal__footer_weather">
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
