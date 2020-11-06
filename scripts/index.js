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


const closeEditButton = popupEdit.querySelector('.popup__close');
const closeAddButton = popupAdd.querySelector('.popup__close');
const closeImageButton = popupImage.querySelector('.popup__close');





for (let i = 0; i < initialCards.length; i++) {
  addElement(initialCards[i].name, initialCards[i].link);
}



function showLike(event) {
  if (event.target.classList.contains('elements__caption-like'))
    event.target.classList.toggle('elements__caption-like_color_black');
}


function showEditPopup() {
  if (popupEdit.classList.contains('popup_opened')) {
    popupEdit.classList.remove('popup_opened');
  } else {
    popupEdit.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
  }
}

function showAddPopup() {
  if (popupAdd.classList.contains('popup_opened')) {
    popupAdd.classList.remove('popup_opened');
    placeInput.value = '';
    linkInput.value = '';
  } else {
    popupAdd.classList.add('popup_opened');
  }
}

function submitEditForm(event) {
  event.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  showEditPopup();
}

function addElement(placeValue, linkValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const placeElement = elementTemplate.cloneNode(true);

  placeElement.querySelector('.elements__caption').textContent = placeValue;
  placeElement.querySelector('.elements__image').src = linkValue;
  placeElement.querySelector('.elements__image').alt = placeValue;
  elementsContainer.prepend(placeElement);
}

function submitAddForm(event) {
  event.preventDefault();

  addElement(placeInput.value, linkInput.value);

  showAddPopup();
}

function removeElement(event) {
  if (event.target.classList.contains('elements__delete-button')) {
    const element = event.target.parentElement;
    element.remove();
  }
}


function showImagePopup() {
  popupImage.classList.toggle('popup_opened');
}


function choiseImagePopup(event) {
  if (event.target.classList.contains('elements__image')) {

    let srcPlace = event.target.parentElement.querySelector('.elements__image').src;
    let altPlace = event.target.parentElement.querySelector('.elements__image').alt;
    let captionPlace = event.target.parentElement.querySelector('.elements__caption').textContent;

    placeImage.src = srcPlace;
    placeImage.alt = altPlace;
    captionImage.textContent = captionPlace;

    showImagePopup()
  }
}


formEdit.addEventListener('submit', submitEditForm);
formAdd.addEventListener('submit', submitAddForm);

editButton.addEventListener('click', showEditPopup);
addButton.addEventListener('click', showAddPopup);
elementsContainer.addEventListener('click', choiseImagePopup);

closeEditButton.addEventListener('click', showEditPopup);
closeAddButton.addEventListener('click', showAddPopup);
closeImageButton.addEventListener('click', showImagePopup);


elementsContainer.addEventListener('click', showLike);
elementsContainer.addEventListener('click', removeElement);