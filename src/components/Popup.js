export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._popupEscClose.bind(this);
    this._handleClickClose = this._popupClickClose.bind(this);
    this._handleclosePopup = this.closePopup.bind(this);
  }


  _popupClickClose(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      this.closePopup();
    }
  }

  _popupEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  };


  _addHandleEscClose() {
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeHandleEscClose() {
    document.removeEventListener('keydown', this._handleEscClose);
  }


  openPopup() {
    this._popup.classList.add('popup_opened');
    this._addHandleEscClose();
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    this._removeHandleEscClose()
  }

  setEventListeners() {
    document.addEventListener('click', this._handleClickClose);
  }
}