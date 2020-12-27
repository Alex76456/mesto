import { initialCards } from '../components/data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  validationPopupsConfig,
  elementsContainer,
  popupEdit,
  formEdit,
  popupAdd,
  popupImage,
  formAdd,
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

//СОЗДАЕМ КАРТОЧКИ: ----------------------------------------------------

function handleCardClick(element) {
  imagePopup.openPopup(element);
}


function createCardElement(item, functionToggleShowPopup, cardSelector) {
  return new Card(item, functionToggleShowPopup, cardSelector).generateCard();
}


const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCardElement(item, handleCardClick, standartCard);

      cardList.addItem(cardElement);
    }
  },
  elementsContainer
);

function addNewElement() {
  const inputsSum = {
    name: placeInput.value,
    link: linkInput.value
  }
  const cardElement = createCardElement(inputsSum, handleCardClick, standartCard);
  cardList.addItem(cardElement);
}

//----------------------------------------------------------------------------------------


const editPopup = new PopupWithForm(popupEdit, submitEditForm);
editPopup.setEventListeners();

const addPopup = new PopupWithForm(popupAdd, submitAddForm);
addPopup.setEventListeners();

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();


function openEditPopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  formEditValidator.setDefaultErrors();
  formEditValidator.setDefaultInputs();
  formEditValidator.setDefaultButton();

  editPopup.openPopup();
}

function openAddPopup() {
  placeInput.value = '';
  linkInput.value = '';

  formAddValidator.setDefaultErrors();
  formAddValidator.setDefaultInputs();
  formAddValidator.setDefaultButton();

  addPopup.openPopup();
}

//SUBMITы ФОРМ: ----------------------------------------------------------------

function submitEditForm() {
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  formEditValidator.setDefaultButton();

  editPopup.closePopup();
}

function submitAddForm() {
  addNewElement();

  formAddValidator.setDefaultButton();

  addPopup.closePopup();
}

// -----------------------------------------------------------


//СЛУШАТЕЛИ: ---------

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

// -----------------------

//ВЫПОЛНЯЕТСЯ:

cardList.renderItems();

formEditValidator.enableValidation();
formAddValidator.enableValidation();