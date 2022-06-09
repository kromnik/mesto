import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__userinfo');
    this._popupSubmitBtn = this._popup.querySelector('.popup__submit-button');
    this._popupSubmitBtnValue = this._popupSubmitBtn.textContent;
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
    super.setEventListeners();
  };

  close() {
    this._formElement.reset();
    super.close();
  };

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupSubmitBtn.textContent = 'Сохранение...'
    } else {
      this._popupSubmitBtn.textContent = this._popupSubmitBtnValue;
    }
  };
}  