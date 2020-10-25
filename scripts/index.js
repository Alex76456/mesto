const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__form');

const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');



const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close');

function showPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}


function closePopup() {
  popup.classList.remove('popup_opened');
}


editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);


function submitForm(event) {
  event.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup();
}

form.addEventListener('submit', submitForm);