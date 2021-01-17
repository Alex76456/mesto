import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import {
  validationPopupsConfig,
  elementsContainer,
  popupEdit,
  popupAdd,
  popupImage,
  popupAvatar,
  popupConfirm,
  name,
  job,
  avatar,
  avatarImage,
  avatarLinkInput,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  editButton,
  addButton,
  standartCard
} from '../utils/constants.js';


//СОЗДАЕМ ВАЛИДАЦИЮ ДЛЯ ФОРМ:---------

const formEditValidator = new FormValidator(validationPopupsConfig, popupEdit);
const formAddValidator = new FormValidator(validationPopupsConfig, popupAdd);
const formAvatarValidator = new FormValidator(validationPopupsConfig, popupAvatar);

//----------------

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: 'd4ad1f5c-6d3d-4923-9666-f0281ec3ce2e',
    'Content-Type': 'application/json'
  }
});


//СОЗДАЕМ ПУСТОГО ЮЗЕРА: --------

const user = new UserInfo(name, job, avatarImage)

//ЗАГРУЖАЕМ ЮЗЕРА И КАРТОЧКИ С СЕРВЕРА: -----------------------

Promise.all([api.getUser(), api.getInitialCards()])
  .then((results) => {

    user.setUserInfo(results[0]);

    const isAppend = true;
    cardList.renderItems(results[1], isAppend);
  })
  .catch((err) => {
    console.error(err);
  });




//СОЗДАЕМ КАРТОЧКИ: -------------------------------------------------------------------

function createCard({ data, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector, userId) {
  const card = new Card({ data, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector, userId);
  return card;
}


const cardList = new Section({
  renderer: (item, insert) => {

    const card = createCard({
      data: item,

      handleCardClick: (name, link) => {
        imagePopup.openPopup(name, link);
      },
      handleDeleteClick: (cardId, deleteCard) => {
        confirmPopup.openPopup(cardId, deleteCard)

      },
      handleLikeClick: (cardId, isLiked, setNewLikeStatus) => {
        if (isLiked === false) {
          api.setLikeCard(cardId)
            .then(res => {
              setNewLikeStatus(res);

            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          api.deleteLikeCard(cardId)
            .then(res => {
              setNewLikeStatus(res);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      },

    }, standartCard, user.getUserInfo().id);

    cardList.addItem(card.generateCard(), insert);
  }

}, elementsContainer);

//----------------------------------------------------------------------------------------




//КОЛБЕКИ ДЛЯ ПОПАПОВ------------------------------

function openAddPopup() {
  placeInput.value = '';
  linkInput.value = '';

  formAddValidator.resetAll();
}

function openEditPopup() {
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;

  formEditValidator.resetAll();
}

function openAvatarPopup() {
  formAvatarValidator.resetAll();
}

//--------------------------------------------------




//SUBMITы ФОРМ: -------------------------------------------------------------------------------------------------------------

function inLoading(isLoading, popupSelector) {
  const submitButton = popupSelector.querySelector('.popup__submit');

  if (isLoading) {
    submitButton.textContent = 'Сохранение...'
  } else {
    submitButton.textContent = 'Сохранить'
  }
}


function submitEditForm(inputsValues) {
  inLoading(true, popupEdit);
  api.setUser(inputsValues)
    .then(res => {
      user.setUserInfo(res);
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`);
    })
    .finally(() => {
      inLoading(false, popupEdit);
      formEditValidator.setDefaultButton();
      editPopup.closePopup();
    })
}

function submitAddForm(inputsValues) {
  api.setNewCard(inputsValues)
    .then((response) => {
      const isAppend = false;
      cardList.renderItems(response, isAppend);

    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      formAddValidator.setDefaultButton();
      addPopup.closePopup();
    })
}

function submitAvatarForm() {
  inLoading(true, popupAvatar);
  api.setUserAvatar(avatarLinkInput.value)
    .then((res) => {
      user.setUserAvatar(res.avatar)
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`);
    })
    .finally(() => {
      inLoading(false, popupAvatar);
      formAvatarValidator.setDefaultButton();
      avatarPopup.closePopup();
    })
}

function submitConfirmForm(cardId, deleteCard) {
  api.deleteCard(cardId)
    .then(() => {
      confirmPopup.closePopup();
      deleteCard();
    })
    .catch((err) => {
      console.error(err);
    });
}

//---------------------------------------------------------------------------------------------------------------------------------------


//СОЗДАЕМ ЭКЗЕМПЛЯРЫ ПОПАПОВ, ПРИМЕНЯЯ КОЛБЕКИ:

const imagePopup = new PopupWithImage(popupImage);
const addPopup = new PopupWithForm(popupAdd, submitAddForm, openAddPopup);
const editPopup = new PopupWithForm(popupEdit, submitEditForm, openEditPopup);
const avatarPopup = new PopupWithForm(popupAvatar, submitAvatarForm, openAvatarPopup);
const confirmPopup = new PopupWithConfirm(popupConfirm, submitConfirmForm);


//СЛУШАТЕЛИ: ---------
addButton.addEventListener('click', () => { addPopup.openPopup(); });
editButton.addEventListener('click', () => { editPopup.openPopup(); });
avatar.addEventListener('click', () => { avatarPopup.openPopup(); });


//ВЫПОЛНЯЕТСЯ:

imagePopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();