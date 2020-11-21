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

const elementsContainer = document.querySelector('.elements__list')


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



//ФУНКЦИИ: ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//СОЗДАЕМ КАРТОЧКИ: ------------

function createElement(placeValue, linkValue) {
  let placeElement = elementTemplate.cloneNode(true);

  const placeElementImage = placeElement.querySelector('.elements__image');
  const placeElementCaption = placeElement.querySelector('.elements__caption');

  placeElementImage.src = linkValue;
  placeElementImage.alt = placeValue;
  placeElementCaption.textContent = placeValue;
  return placeElement
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

const closeCurrentPopup = () => {
  const currentPopup = document.querySelector('.popup_opened');

  if (currentPopup.querySelector('.popup__submit')) {
    setDefaultInputs();
    setDefaultErrors();
    setDefaultButton();
    showPopup(currentPopup);
  } else {
    showPopup(currentPopup);
  }
}


const closePopupFromButton = (event) => {
  if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
    closeCurrentPopup();
  }
}

const hotKeys = (event) => {
  if (event.keyCode === 27) {
    closeCurrentPopup();
  }
}

//--------------------------------------------------------------




//ОТКРЫТЬ ПОПАП: -----------------------------------------------------------------

const showPopup = (popup) => {
  popup.classList.toggle('popup_opened');
}


function openEditPopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  showPopup(popupEdit);
}

function openAddPopup() {
  placeInput.value = '';
  linkInput.value = '';
  showPopup(popupAdd);
}


function openImagePopup(event) {
  if (event.target.classList.contains('elements__image')) {

    const chosenImage = event.target.parentElement.querySelector('.elements__image');
    const chosenCaption = event.target.parentElement.querySelector('.elements__caption');

    placeImage.src = chosenImage.src;
    placeImage.alt = chosenImage.alt;
    captionImage.textContent = chosenCaption.textContent;

    showPopup(popupImage)
  };
};
// ------------------------------------------------------------------------------------------------------



//ЛАЙКИ И УДАЛЕНИЕ КАРТОЧЕК:------------
const showLike = (event) => {
  if (event.target.classList.contains('elements__caption-like'))
    event.target.classList.toggle('elements__caption-like_color_black');
}

const removeElement = (event) => {
    if (event.target.classList.contains('elements__delete-button')) {
      let element = event.target.parentElement;
      element.remove();
    }
  }
  //--------



//SUBMITы ФОРМ: ----------------------------------------------------------------


function submitEditForm(event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  setDefaultButton();
  showPopup(popupEdit);
}


function submitAddForm(event) {
  event.preventDefault();
  addNewElement();
  setDefaultButton();
  showPopup(popupAdd);
}
// -----------------------------------------------------------


//СЛУШАТЕЛИ:


formEdit.addEventListener('submit', submitEditForm);
formAdd.addEventListener('submit', submitAddForm);

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
elementsContainer.addEventListener('click', openImagePopup);

document.addEventListener('click', closePopupFromButton);
document.addEventListener('keydown', hotKeys);

elementsContainer.addEventListener('click', showLike);
elementsContainer.addEventListener('click', removeElement);


//ВЫПОЛНЯЕТСЯ:

renderElements()