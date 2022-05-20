export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  };

  setEventListeners() {
    this._popupCloseBtn.addEventListener('click', () => this.close());
    document.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
  };
}