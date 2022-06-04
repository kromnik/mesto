import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popup.querySelector('.popup__form_type_confirm');
    this._popupSubmitBtn = this._popup.querySelector('.popup__submit-button');
    this._popupSubmitBtnValue = this._popupSubmitBtn.textContent;
  };

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
    super.setEventListeners();
  };

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupSubmitBtn.textContent = 'Удаление...'
    } else {
      this._popupSubmitBtn.textContent = this._popupSubmitBtnValue;
    }
  };
}