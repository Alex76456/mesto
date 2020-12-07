export class FormValidator {
  constructor(validationPopupsConfig, validatingForm) {
    this._formSelector = validationPopupsConfig.formSelector;
    this._inputSelector = validationPopupsConfig.inputSelector;
    this._fieldsetSelector = validationPopupsConfig.fieldsetSelector;
    this._submitButtonSelector = validationPopupsConfig.submitButtonSelector;
    this._inactiveButtonClass = validationPopupsConfig.inactiveButtonClass;
    this._inputErrorClass = validationPopupsConfig.inputErrorClass;
    this._errorClass = validationPopupsConfig.errorClass;

    this._validatingForm = validatingForm;
  }

  //ПОКАЗАТЬ ИЛИ СКРЫТЬ ОШИБКИ В ЗАВИСИМОСТИ ОТ ВАЛИДНОСТИ ФОРМЫ: -----------------------------------------------------------

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };


  _checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement);
    } else {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    }
  };

  // -----------------------------------------------


  //ПЕРЕКЛЮЧАТЕЛЬ АКТИВНОСТИ КНОПКИ САБМИТА В ЗАВИСИМОСТИ НАЛИЧИЯ ХЯТЯБЫ ОДНОГО НЕВАЛИДНОГО ИНПУТА: -------------

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //-----------------------------------------------------------


  //ФУНКЦИИ УСТАНОВКИ СЛУШАТЕЛЕЙ НА ДОКУМЕНТ ЗАТЕМ И НА ФОРМЫ: -----------------------------

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));

    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);


    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    this._validatingForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(this._validatingForm.querySelectorAll(this._fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset);
    });
  };
}




















/*
enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(this._formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset);
    });
  });
};
*/






//как было: 
/*
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


*/