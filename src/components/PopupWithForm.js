import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, opener) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._opener = opener;
    this._popupForm = this._popup.querySelector('.popup__form');
  }



  openPopup() {
    super.openPopup();
    this._opener();
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submitForm);
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}