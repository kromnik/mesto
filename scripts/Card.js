export default class Card {
  constructor(data, cardTemplate, openPopupZoomImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._openPopupZoomImage = openPopupZoomImage;
  };

  _getTemplate() {
    const elementCard = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true);
    
    return elementCard;  
  };

  _setEventListeners() {
    this._card.querySelector('.card__like-icon').addEventListener('click', () => {
      this._likeCardIcon();
    });
    this._card.querySelector('.card__btn-del').addEventListener('click', () => {
      this._deleteCard();
    });
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._openPopupZoomImage(this._link, this._name);
    });
  };

  _likeCardIcon() {
    this._card.querySelector('.card__like-icon').classList.toggle('card__like-icon_action_like');
  };

  _deleteCard() {
    this._card.querySelector('.card__btn-del').closest('.card').remove();
    this._card = null;
  };

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__title').textContent = this._name;

    return this._card;
  };

};
