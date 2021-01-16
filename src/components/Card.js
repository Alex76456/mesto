export class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._isLiked = false;

    this._cardSelector = cardSelector;
    this._userId = userId;
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._likeHearth = this._element.querySelector('.elements__caption-like');
    this._likesNumber = this._element.querySelector('.elements__likes-number');
  }

  _getTemplate() {
    const elementTemplate = this._cardSelector.cloneNode(true);
    return elementTemplate;
  }



  _seekUserLike(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]._id === this._userId) {
        return true;
      }
    }
    return false;
  }

  _renderUserLike(answer) {
    if (answer === true) {
      this._likeHearth.classList.add('elements__caption-like_color_black');
      this._isLiked = true;
    } else {
      this._likeHearth.classList.remove('elements__caption-like_color_black');
      this._isLiked = false;
    }
  }


  _setCurrentLikeStatus(newDataCard) {
    this._likesNumber.textContent = newDataCard.likes.length;
    this._renderUserLike(this._seekUserLike(newDataCard.likes));

  }



  _setEventListeners() {
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this._id, this._element);
      });
    }

    this._element.querySelector('.elements__caption-like').addEventListener('click', () => {
      this._handleLikeClick(this._id, this._isLiked, (newDataCard) => { this._setCurrentLikeStatus(newDataCard) });
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }


  generateCard() {
    this._setEventListeners();

    const placeElementImage = this._element.querySelector('.elements__image');

    placeElementImage.src = this._link;
    placeElementImage.alt = this._name;
    this._element.querySelector('.elements__caption').textContent = this._name;
    this._likesNumber.textContent = this._likes.length;
    this._renderUserLike(this._seekUserLike(this._likes));

    return this._element;
  }
}