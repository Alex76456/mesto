import { initialCards } from './data.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


// ------------------------------

//УСТАНАВЛИВАЕМ КОНФИГ ДЛЯ ВАЛИДАЦИИ ПОПАПОВ:---------------------------------------------------

const validationPopupsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldsetSelector: '.popup__form-set',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//----------------------------

//КОНСТАНТЫ: --------------------------

const elementsContainer = document.querySelector('.elements__list');


const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup_type_add');
const formAdd = popupAdd.querySelector('.popup__form');


const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');


const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

const placeInput = popupAdd.querySelector('.popup__input_type_place');
const linkInput = popupAdd.querySelector('.popup__input_type_link');


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const standartCard = document.querySelector('#element-template').content.querySelector('.elements__list-item');


// ----------------------------

//ФУНКЦИИ: ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//СОЗДАЕМ КАРТОЧКИ: ------------

function addPrepend(elementToInsert) {
  elementsContainer.prepend(elementToInsert);
}

function createCopyOfClassCard(item, functionToggleShowPopup, cardSelector) {
  return new Card(item, functionToggleShowPopup, cardSelector);
}


function addNewElement() {
  const inputsSum = {
    name: placeInput.value,
    link: linkInput.value
  }

  const cardElement = createCopyOfClassCard(inputsSum, toggleShowPopup, standartCard).generateCard();
  addPrepend(cardElement);
}


const renderElements = () => {
  initialCards.forEach((item) => {

    const cardElement = createCopyOfClassCard(item, toggleShowPopup, standartCard).generateCard();
    addPrepend(cardElement);
  });
};


//----------------------------------------------------------------------------------------

//НАЙТИ: -------------------------
//открытый попап:

const getIsOpenedPopup = () => {
  return document.querySelector('.popup_opened');
};

//кнопку сабмита в открытом попапе: 
const getСurrentSubmitButton = () => {
  return getIsOpenedPopup().querySelector('.popup__submit');
};

//инпуты в открытом попапе: 
const getСurrentInputs = () => {
  return Array.from(getIsOpenedPopup().querySelectorAll('.popup__input'));
};

//---------------------------------



//СДЕЛАТЬ ЭЛЕМЕНТЫ ПО ДЕФОЛТУ: ----------------------------------------------------------

const setDefaultButton = () => {

  if (!getСurrentSubmitButton().classList.contains('popup__submit_disabled')) {
    getСurrentSubmitButton().classList.add('popup__submit_disabled');
    getСurrentSubmitButton().disabled = true;
  }
};

const setDefaultInputs = () => {

  getСurrentInputs().forEach(input => {
    if (input.classList.contains('popup__input_type_error')) {
      input.classList.remove('popup__input_type_error');
    }
  });
};

//-----------------------------------------------------------------------------------------------


//ЗАКРЫТЬ ПОПАП: -----------------------------------------------------------

const setHotKeyEsc = (event) => {
  if (event.key === "Escape") {
    closeCurrentPopup();
  }
};


const setToggleEventListenerEsc = (popup) => {
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', setHotKeyEsc);
  } else {
    document.removeEventListener('keydown', setHotKeyEsc);
  }
};



const closeCurrentPopup = () => {

  if (getIsOpenedPopup().querySelector('.popup__submit')) {
    setDefaultInputs();
    new FormValidator(validationPopupsConfig, getIsOpenedPopup()).setDefaultErrors();
    setDefaultButton();
  }
  toggleShowPopup(getIsOpenedPopup());
};


const closePopupFromButton = (event) => {
  if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
    closeCurrentPopup();
  }
};


//--------------------------------------------------------------


//ОТКРЫТЬ ПОПАП: -----------------------------------------------------------------

const toggleShowPopup = (popup) => {
  popup.classList.toggle('popup_opened');
  setToggleEventListenerEsc(popup);
};


function openEditPopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  toggleShowPopup(popupEdit);
}

function openAddPopup() {
  placeInput.value = '';
  linkInput.value = '';
  toggleShowPopup(popupAdd);
}

// ------------------------------------------------------------------------------------------------------


//SUBMITы ФОРМ: ----------------------------------------------------------------


function submitEditForm(event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  setDefaultButton();
  toggleShowPopup(popupEdit);
}


function submitAddForm(event) {
  event.preventDefault();
  addNewElement();
  setDefaultButton();
  toggleShowPopup(popupAdd);
}
// -----------------------------------------------------------


//СЛУШАТЕЛИ: ---------


formEdit.addEventListener('submit', submitEditForm);
formAdd.addEventListener('submit', submitAddForm);

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

document.addEventListener('click', closePopupFromButton);


// -----------------------

//ВЫПОЛНЯЕТСЯ:

renderElements();

const formEditValidator = new FormValidator(validationPopupsConfig, popupEdit);
const formAddValidator = new FormValidator(validationPopupsConfig, popupAdd);

formEditValidator.enableValidation();
formAddValidator.enableValidation();