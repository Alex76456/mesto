const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const popupImage = document.querySelector('.popup_type_image');

const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');


const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

const placeInput = popupAdd.querySelector('.popup__input_type_place');
const linkInput = popupAdd.querySelector('.popup__input_type_link');

const placeImage = popupImage.querySelector('.popup__image');
const captionImage = popupImage.querySelector('.popup__image-caption');


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


const elementTemplate = document.querySelector('#element-template').content;

// ----------------------------

//ФУНКЦИИ: ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//СОЗДАЕМ КАРТОЧКИ: ------------

function createElement(placeValue, linkValue) {
  const placeElement = elementTemplate.cloneNode(true);

  const placeElementImage = placeElement.querySelector('.elements__image');
  const placeElementCaption = placeElement.querySelector('.elements__caption');

  placeElementImage.src = linkValue;
  placeElementImage.alt = placeValue;
  placeElementCaption.textContent = placeValue;
  return placeElement;
}

function addPrepend(x) {
  elementsContainer.prepend(x);
}

function addNewElement() {
  addPrepend(createElement(placeInput.value, linkInput.value));
}


function renderElements() {
  for (let i = 0; i < initialCards.length; i++) {
    addPrepend(createElement(initialCards[i].name, initialCards[i].link));
  }
}
//----------------------------------------------------------------------------------------



//СДЕЛАТЬ ЭЛЕМЕНТЫ ПО ДЕФОЛТУ: ----------------------------------------------------------

const setDefaultButton = () => {
  const currentPopup = document.querySelector('.popup_opened');
  const currentSubmitButton = currentPopup.querySelector('.popup__submit');

  if (!currentSubmitButton.classList.contains('popup__submit_disabled')) {
    currentSubmitButton.classList.add('popup__submit_disabled');
    currentSubmitButton.disabled = true;
  }
};

const setDefaultErrors = () => {
  const currentPopup = document.querySelector('.popup_opened');
  const currentErrors = Array.from(currentPopup.querySelectorAll('.popup__input-error'));

  currentErrors.forEach(error => {
    if (error.classList.contains('popup__input-error_visible')) {
      error.classList.remove('popup__input-error_visible');
    }
  });
};

const setDefaultInputs = () => {
  const currentPopup = document.querySelector('.popup_opened');
  const currentInputs = Array.from(currentPopup.querySelectorAll('.popup__input'));

  currentInputs.forEach(input => {
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


const setToggleEventListenerEsc = () => {
  if (!document.removeEventListener('keydown', setHotKeyEsc)) {
    document.addEventListener('keydown', setHotKeyEsc);
  } else {
    document.removeEventListener('keydown', setHotKeyEsc);
  }
};


const closeCurrentPopup = () => {
  const currentPopup = document.querySelector('.popup_opened');

  if (currentPopup.querySelector('.popup__submit')) {
    setDefaultInputs();
    setDefaultErrors();
    setDefaultButton();
  }
  toggleShowPopup(currentPopup);
  setToggleEventListenerEsc();
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
};


function openEditPopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  toggleShowPopup(popupEdit);
  setToggleEventListenerEsc();
}

function openAddPopup() {
  placeInput.value = '';
  linkInput.value = '';
  toggleShowPopup(popupAdd);
  setToggleEventListenerEsc();
}


function openImagePopup(event) {
  if (event.target.classList.contains('elements__image')) {

    const chosenImage = event.target.parentElement.querySelector('.elements__image');
    const chosenCaption = event.target.parentElement.querySelector('.elements__caption');

    placeImage.src = chosenImage.src;
    placeImage.alt = chosenImage.alt;
    captionImage.textContent = chosenCaption.textContent;

    toggleShowPopup(popupImage);
    setToggleEventListenerEsc();
  }
}
// ------------------------------------------------------------------------------------------------------



//ЛАЙКИ И УДАЛЕНИЕ КАРТОЧЕК:------------
const toggleShowLike = (event) => {
  if (event.target.classList.contains('elements__caption-like'))
    event.target.classList.toggle('elements__caption-like_color_black');
};

const removeElement = (event) => {
  if (event.target.classList.contains('elements__delete-button')) {
    const element = event.target.parentElement;
    element.remove();
  }
};

//---------------



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
elementsContainer.addEventListener('click', openImagePopup);

document.addEventListener('click', closePopupFromButton);

elementsContainer.addEventListener('click', toggleShowLike);
elementsContainer.addEventListener('click', removeElement);

// -----------------------



//ВЫПОЛНЯЕТСЯ:

renderElements();
enableValidation(validationPopupsConfig);







