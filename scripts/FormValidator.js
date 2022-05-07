export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButtonSubmit();
    } else {
      this.enableButtonSubmit();
    };
  };

  enableButtonSubmit() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  };

  disableButtonSubmit() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  };

  resetFormValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();  
    });
  }; 
};