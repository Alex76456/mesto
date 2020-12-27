import './index.css'
import { initialCards } from '../components/data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
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
  name,
  job,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  editButton,
  addButton,
  standartCard,
} from '../utils/constants.js';

const formEditValidator = new FormValidator(validationPopupsConfig, popupEdit);
const formAddValidator = new FormValidator(validationPopupsConfig, popupAdd);


//СОЗДАЕМ ЮЗЕРА: -----------------------

const user = new UserInfo(name, job)

//СОЗДАЕМ КАРТОЧКИ: ----------------------------------------------------

function createCard({ data, handleCardClick }, cardSelector) {
  const card = new Card({ data, handleCardClick }, cardSelector);
  return card;
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard({
      data: item,
      handleCardClick: (element) => {
        imagePopup.openPopup(element);
      }
    }, standartCard);

    cardList.addItem(card.generateCard());
  }
}, elementsContainer);


function addNewCard() {
  const inputsSum = {
    name: placeInput.value,
    link: linkInput.value
  }
  const card = createCard({
    data: inputsSum,
    handleCardClick: (element) => {
      imagePopup.openPopup(element);
    }
  }, standartCard);
  cardList.addItem(card.generateCard());
}

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

//SUBMITы ФОРМ: ----------------------------------------------------------------

function submitEditForm() {
  user.setUserInfo(nameInput.value, jobInput.value)

  formEditValidator.setDefaultButton();
  editPopup.closePopup();
}

function submitAddForm() {
  addNewCard();
  formAddValidator.setDefaultButton();
  addPopup.closePopup();
}


//СОЗДАЕМ ЭКЗЕМПЛЯРЫ ПОПАПОВ, ПРИМЕНЯЯ КОЛБЕКИ:

const imagePopup = new PopupWithImage(popupImage);

const addPopup = new PopupWithForm(popupAdd, submitAddForm, openAddPopup);

const editPopup = new PopupWithForm(popupEdit, submitEditForm, openEditPopup);


//СЛУШАТЕЛИ: ---------
addButton.addEventListener('click', () => { addPopup.openPopup(); });
editButton.addEventListener('click', () => { editPopup.openPopup(); });


//ВЫПОЛНЯЕТСЯ:

cardList.renderItems();

formEditValidator.enableValidation();
formAddValidator.enableValidation();