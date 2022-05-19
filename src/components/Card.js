export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
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
    this._cardLikeIcon = this._card.querySelector('.card__like-icon');
    this._cardImage = this._card.querySelector('.card__image');
    
    this._cardLikeIcon.addEventListener('click', () => {
      this._likeCardIcon();
    });
    this._card.querySelector('.card__btn-del').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  };

  _likeCardIcon() {
    this._cardLikeIcon.classList.toggle('card__like-icon_action_like');
  };

  _deleteCard() {
    this._card.remove();
    this._card = null;
  };

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._card.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = "фото " + this._name;

    return this._card;
  };
}
