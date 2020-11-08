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
let placeElement


function createElement(placeValue, linkValue) {
  placeElement = elementTemplate.cloneNode(true);

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

renderElements()



const showPopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

const closePopup = (event) => {
  if (event.target.classList.contains('popup__close')) {
    const parentPopup = event.target.closest('.popup');
    showPopup(parentPopup);
  }
}


function choiseImagePopup(event) {
  if (event.target.classList.contains('elements__image')) {

    const chosenImage = event.target.parentElement.querySelector('.elements__image');
    const chosenCaption = event.target.parentElement.querySelector('.elements__caption');

    placeImage.src = chosenImage.src;
    placeImage.alt = chosenImage.alt;
    captionImage.textContent = chosenCaption.textContent;

    showPopup(popupImage)
  }
}

function editPopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  showPopup(popupEdit);
}

function addPopup() {
  placeInput.value = '';
  linkInput.value = '';
  showPopup(popupAdd);
}

function submitEditForm(event) {
  event.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  showPopup(popupEdit);
}


function submitAddForm(event) {
  event.preventDefault();

  addNewElement();

  showPopup(popupAdd);
}

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


formEdit.addEventListener('submit', submitEditForm);
formAdd.addEventListener('submit', submitAddForm);

editButton.addEventListener('click', editPopup);
addButton.addEventListener('click', addPopup);
elementsContainer.addEventListener('click', choiseImagePopup);

document.addEventListener('click', closePopup);

elementsContainer.addEventListener('click', showLike);
elementsContainer.addEventListener('click', removeElement);