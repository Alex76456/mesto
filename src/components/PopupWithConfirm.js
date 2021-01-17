import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }


  openPopup(cardId, deleteCard) {
    super.openPopup();
    this._id = cardId;
    this._funcToDeleteCard = deleteCard;
  }



  _formSubmit(evt) {
    evt.preventDefault();
    this._submitForm(this._id, this._funcToDeleteCard);
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => { this._formSubmit(evt) });
  }

}