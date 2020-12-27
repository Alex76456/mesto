export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  };


  _handleClickClose(event) {
    if (event.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose.bind(this));

    document.addEventListener('click', (event) => {
      this._handleClickClose(event)
    });

    this.setEventListeners()
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose.bind(this));

    document.removeEventListener('click', (event) => {
      this._handleClickClose(event)
    });
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', this.closePopup.bind(this));
  }
}