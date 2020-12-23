export class Card {
  constructor(item, handleCardClick, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate = () => {
    const elementTemplate = this._cardSelector.cloneNode(true);
    return elementTemplate;
  }


  _toggleShowLike = () => {
    this._element.querySelector('.elements__caption-like').classList.toggle('elements__caption-like_color_black');
  };


  _removeElement = () => {
    this._element.remove();
    this._element = null
  };


  _setEventListeners = () => {
    this._element.querySelector('.elements__caption-like').addEventListener('click', () => {
      this._toggleShowLike();
    });

    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._removeElement();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._element);
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