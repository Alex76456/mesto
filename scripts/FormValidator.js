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

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._validatingForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._validatingForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };


  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  // -----------------------------------------------


  //ПЕРЕКЛЮЧАТЕЛЬ АКТИВНОСТИ КНОПКИ САБМИТА В ЗАВИСИМОСТИ НАЛИЧИЯ ХЯТЯБЫ ОДНОГО НЕВАЛИДНОГО ИНПУТА: -------------

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  //-----------------------------------------------------------




  //ФУНКЦИИ УСТАНОВКИ СЛУШАТЕЛЕЙ НА ДОКУМЕНТ ЗАТЕМ И НА ФОРМЫ: -----------------------------

  _setEventListeners = () => {
    this._inputList = Array.from(this._validatingForm.querySelectorAll(this._inputSelector));

    this._buttonElement = this._validatingForm.querySelector(this._submitButtonSelector);
    this._toggleButtonState();


    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //СБРОС ОШИБОК:------------------

  setDefaultErrors = () => {
    const currentErrors = Array.from(this._validatingForm.querySelectorAll('.popup__input-error'));

    currentErrors.forEach(error => {
      if (error.classList.contains('popup__input-error_visible')) {
        error.classList.remove('popup__input-error_visible');
      }
    });
  };

  //---------------------


  enableValidation = () => {
    this._validatingForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  };
}