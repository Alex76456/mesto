import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  validationPopupsConfig,
  elementsContainer,
  popupEdit,
  popupAdd,
  popupImage,
  popupAvatar,
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
  standartCard,
  cardFromOtherUsers
} from '../utils/constants.js';

const formEditValidator = new FormValidator(validationPopupsConfig, popupEdit);
const formAddValidator = new FormValidator(validationPopupsConfig, popupAdd);
const formAvatarValidator = new FormValidator(validationPopupsConfig, popupAvatar);

const user = new UserInfo(name, job, avatar)

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: 'd4ad1f5c-6d3d-4923-9666-f0281ec3ce2e',
    'Content-Type': 'application/json'
  }
});



//ЗАГРУЖАЕМ ЮЗЕРА С СЕРВЕРА: -----------------------


Promise.resolve(api.getUser())
  .then((data) => {
    user.setUserInfo(data.name, data.about, data.avatar);
    avatarImage.src = data.avatar;
    avatarImage.alt = data.name;

  });


//СОЗДАЕМ КАРТОЧКИ: ----------------------------------------------------

function createCard({ data, handleCardClick }, cardSelector) {
  const card = new Card({ data, handleCardClick }, cardSelector);
  return card;
}

const cardList = new Section({
  renderer: (item) => {
    if (item.owner.__id === 'a92a3a24f68ddeeeed65bc22') {
      const card = createCard({
        data: item,
        handleCardClick: (name, link) => {
          imagePopup.openPopup(name, link);
        }
      }, standartCard);

      cardList.addItem(card.generateCard());
    } else {

      const card = createCard({
        data: item,
        handleCardClick: (name, link) => {
          imagePopup.openPopup(name, link);
        }
      }, cardFromOtherUsers);

      cardList.addItem(card.generateCard());
    }

  }
}, elementsContainer);




Promise.resolve(api.getInitialCards())
  .then((data) => {

    cardList.renderItems(data);
  });


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



//SUBMITы ФОРМ: ----------------------------------------------------------------


function inLoading(isLoading, popupSelector) {

  const submitButton = popupSelector.querySelector('.popup__submit');

  if (isLoading) {
    submitButton.textContent = 'Сохранение...'
  } else {
    submitButton.textContent = 'Сохранить'
  }
}


function submitEditForm() {

  inLoading(true, popupEdit);

  api.setUser(nameInput.value, jobInput.value)
    .then(res => {
      user.setUserInfo(res.name, res.about);
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


function submitAddForm() {

  inLoading(true, popupAdd);

  api.setNewCard(placeInput.value, linkInput.value)
    .then(res => {

      const card = createCard({
        data: res,
        handleCardClick: (name, link) => {
          imagePopup.openPopup(name, link);
        }
      }, standartCard);
      cardList.addItem(card.generateCard());

    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`);
    })
    .finally(() => {
      inLoading(false, popupAdd);
      formAddValidator.setDefaultButton();
      addPopup.closePopup();
    })


}



function submitAvatarForm() {
  inLoading(true, popupAvatar);

  api.setUserAvatar(avatarLinkInput.value)
    .then((res) => {
      avatarImage.src = res.avatar;
      avatarImage.alt = user.getUserInfo().name;
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


//СОЗДАЕМ ЭКЗЕМПЛЯРЫ ПОПАПОВ, ПРИМЕНЯЯ КОЛБЕКИ:

const imagePopup = new PopupWithImage(popupImage);
const addPopup = new PopupWithForm(popupAdd, submitAddForm, openAddPopup);
const editPopup = new PopupWithForm(popupEdit, submitEditForm, openEditPopup);
const avatarPopup = new PopupWithForm(popupAvatar, submitAvatarForm, openAvatarPopup);


//СЛУШАТЕЛИ: ---------
addButton.addEventListener('click', () => { addPopup.openPopup(); });
editButton.addEventListener('click', () => { editPopup.openPopup(); });
avatar.addEventListener('click', () => { avatarPopup.openPopup(); });


//ВЫПОЛНЯЕТСЯ:

imagePopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
avatarPopup.setEventListeners();


formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();