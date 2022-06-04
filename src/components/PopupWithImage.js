import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImageZoom =  document.querySelector('.popup__image-zoom');
    this._cardImageZoomDescription =  document.querySelector('.popup__image-zoom-description');
  };

  open(data) {
      this._cardImageZoom.src = data.link;
      this._cardImageZoomDescription.textContent = data.name;
      this._cardImageZoom.alt = "увеличенное фото " + data.name;
      super.open();
  };  
}
