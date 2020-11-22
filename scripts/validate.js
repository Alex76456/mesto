//ПОКАЗАТЬ ИЛИ СКРЫТЬ ОШИБКИ В ЗАВИСИМОСТИ ОТ ВАЛИДНОСТИ ФОРМЫ: -----------------------------------------------------------

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
};

// -----------------------------------------------


//ПЕРЕКЛЮЧАТЕЛЬ АКТИВНОСТИ КНОПКИ САБМИТА В ЗАВИСИМОСТИ НАЛИЧИЯ ХЯТЯБЫ ОДНОГО НЕВАЛИДНОГО ИНПУТА: -------------

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//-----------------------------------------------------------


//ФУНКЦИИ УСТАНОВКИ СЛУШАТЕЛЕЙ НА ДОКУМЕНТ ЗАТЕМ И НА ФОРМЫ: -----------------------------

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, config);
    });
  });
};

// ----------------------------------------------


//УСТАНАВЛИВАЕМ КОНФИГ:---------------------------------------------------
//(ЭТО МОЖНО ПЕРЕНЕСТИ В index.js)

const validationPopupsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldsetSelector: '.popup__form-set',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};


//ВЫПОЛНЯЕТСЯ:
//(ЭТО МОЖНО ПЕРЕНЕСТИ В index.js)

enableValidation(validationPopupsConfig);