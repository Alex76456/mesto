export class Card {
  constructor(item, toggleShowPopup) {
    this._name = item.name;
    this._link = item.link;
    this._toggleShowPopup = toggleShowPopup;
  }

  _getTemplate = () => {
    const elementTemplate = document
      .querySelector('#element-template')
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true);

    return elementTemplate;
  }



  _toggleShowLike = () => {
    this._element.querySelector('.elements__caption-like').classList.toggle('elements__caption-like_color_black');
  };


  _removeElement = () => {
    this._element.remove();
  };

  _openImagePopup = () => {
    const popupImage = document.querySelector('.popup_type_image');
    const placeImage = popupImage.querySelector('.popup__image');
    const captionImage = popupImage.querySelector('.popup__image-caption');


    placeImage.src = this._link;
    placeImage.alt = this._name;
    captionImage.textContent = this._name;


    this._toggleShowPopup(popupImage);
  }

  _setEventListeners = () => {
    this._element.querySelector('.elements__caption-like').addEventListener('click', () => {
      this._toggleShowLike();
    });

    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._removeElement();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openImagePopup();
    });
  }


  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeElementImage = this._element.querySelector('.elements__image');

    placeElementImage.src = this._link;
    placeElementImage.alt = this._name;
    this._element.querySelector('.elements__caption').textContent = this._name;

    return this._element;
  }
}