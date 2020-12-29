export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._popupEscClose.bind(this);
    this._handleClickClose = this._popupClickClose.bind(this);
  }


  _popupEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  };


  _popupClickClose(event) {
    if (event.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }


  setEventListeners() {
    this._closeButton.addEventListener('click', this.closePopup.bind(this));

    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleClickClose);
  }

  removeEventListeners() {
    this._closeButton.removeEventListener('click', this.closePopup.bind(this));

    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleClickClose);
  }
}