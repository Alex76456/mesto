import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }


  openPopup(cardId, element) {
    super.openPopup();
    this._id = cardId;
    this._elementToDelete = element;
  }



  _formSubmit(evt) {
    evt.preventDefault();
    this._submitForm(this._id, this._elementToDelete);
    //this._elementToDelete.remove();
    //this._elementToDelete = null
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => { this._formSubmit(evt) });
  }

}