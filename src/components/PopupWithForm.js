import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues = () => {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._inputsValues = {};
    this._inputList.forEach(input => this._inputsValues[input.name] = input.value);

    return this._inputsValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._formSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', this._submitForm);
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}