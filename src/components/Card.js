export default class Card {
  constructor({data, handleClickCard, handleLikeCard, 
    handleDeleteCard}, cardTemplate, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleClickCard = handleClickCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._cardTemplate = cardTemplate;
    this._userId = userId;
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
    this._cardName = this._card.querySelector('.card__title');
    this._cardLikeCount = this._card.querySelector('.card__like-count');
    this._cardBtnDelete = this._card.querySelector('.card__btn-delete');
    
    this._cardLikeIcon.addEventListener('click', () => {
        this._handleLikeCard(this._cardId); 
    });
    
    this._cardBtnDelete.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleClickCard(this._link, this._name);
    });
  };

  setLikeCountCard(data) {
    this._likes = data.likes;
    this.likeCountCard();
    this._updateLikeCard();
  };

  likeCountCard() {
    this._cardLikeCount.textContent = this._likes.length;
  };

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  };

  handleDeleteCard() {
    this._card.remove();
    this._card = null;
  };

  _updateLikeCard() {
    if (this.isLiked()) {
      this._cardLikeIcon.classList.add('card__like-icon_action_like');
    } else {
      this._cardLikeIcon.classList.remove('card__like-icon_action_like');
    }
  };

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this.likeCountCard();
    this._updateLikeCard();

    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardImage.alt = "фото " + this._name;

    this._cardBtnDelete.classList.add
    (this._ownerId === this._userId? 'card__btn-delete_action_visible' : 'card__btn-delete');
    
    return this._card;
  };
}
