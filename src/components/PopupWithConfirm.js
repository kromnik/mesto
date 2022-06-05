import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupSubmitBtn = this._popup.querySelector('.popup__submit-button');
    this._popupSubmitBtnValue = this._popupSubmitBtn.textContent;
  };

  open(data) {
    this._data = data;
    super.open();
  };

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._data);
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