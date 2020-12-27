import Popup from './Popup.js'


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._imageCaption = this._popup.querySelector('.popup__image-caption');

  }

  openPopup(element) {
    const cardImage = element.querySelector('.elements__image');
    const cardCaption = element.querySelector('.elements__caption');

    this._image.src = cardImage.src;
    this._image.alt = cardImage.alt;
    this._imageCaption.textContent = cardCaption.textContent;

    super.openPopup();
  }

}