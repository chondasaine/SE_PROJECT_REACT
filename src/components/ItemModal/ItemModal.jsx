import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseModal, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_img">
        <button
          type="button"
          onClick={handleCloseModal}
          className="modal__close modal__close_itm"
        ></button>
        <img src={card.link} alt="" className="modal__img" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
