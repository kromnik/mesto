export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector; 
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
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
  };

  setEventListeners() {
    this._popupCloseBtn = this._popupSelector.querySelector('.popup__close-button');
    
    this._popupCloseBtn.addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
  };
}