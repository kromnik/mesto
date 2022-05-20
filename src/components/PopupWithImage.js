import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImageZoom =  document.querySelector('.popup__image-zoom');
    this._cardImageZoomDescription =  document.querySelector('.popup__image-zoom-description');
  };

  open(link, name) {
      this._cardImageZoom.src = link;
      this._cardImageZoomDescription.textContent = name;
      this._cardImageZoom.alt = "увеличенное фото " + name;
      super.open();
  };  
}
