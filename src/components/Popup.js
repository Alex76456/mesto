export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  };

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));

  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));

  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', this.closePopup.bind(this))
  }
}