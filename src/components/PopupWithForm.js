import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, opener) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._opener = opener;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
  }


  _getInputValues() {
    this._inputsValues = {};
    this._inputList.forEach(input => this._inputsValues[input.name] = input.value);
    return this._inputsValues;
  }


  openPopup() {
    super.openPopup();
    this._opener();
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', () => { this._submitForm(this._getInputValues()); })
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}