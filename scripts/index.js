//  попапы

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupZoomImage = document.querySelector('.popup_zoom-photo');

// кнопки

const openPopupEditBtn = document.querySelector('.profile__edit-button');
const openPopupAddBtn = document.querySelector('.profile__add-button');
const closePopupEditBtn = popupEditProfile.querySelector('.popup__close-button_type_edit');
const closePopupAddBtn = popupAddCard.querySelector('.popup__close-button_type_add');
const closePopupZoomBtn = popupZoomImage.querySelector('.popup__close-button_type_zoom');


// редактирование профиля  и добавление карточки

const formElementEditProfile = document.querySelector('.popup__form_type_edit-profile');
const usernameInput = formElementEditProfile.querySelector('.popup__userinfo_info_username');
const userAboutInput = formElementEditProfile.querySelector('.popup__userinfo_info_user-about');
const profileUsername = document.querySelector('.profile__profile-info-username');
const profileUserAbout = document.querySelector('.profile__profile-info-user-about');
const formElementAddCard = document.querySelector('.popup__form_type_add-card');
const cardNameInput = formElementAddCard.querySelector('.popup__userinfo_card_name');
const cardLinkInput = formElementAddCard.querySelector('.popup__userinfo_card_link');

// zoom фото

const cardImageZoom = popupZoomImage.querySelector('.popup__image-zoom');
const cardImageZoomDescription = popupZoomImage.querySelector('.popup__image-zoom-description');

//  первичное добавление карточек

const cardTemplate = document.querySelector('#card-template').content;
const cardElements = document.querySelector('.elements');

// функция создания карточек

function createCard (card) {
  const elementCard = cardTemplate.querySelector('.card').cloneNode(true);
  const elementCardImage = elementCard.querySelector('.card__image');
  const elementCardTitle = elementCard.querySelector('.card__title');
  const elementCardLikeIcon = elementCard.querySelector('.card__like-icon');
  const elementCardDelete = elementCard.querySelector('.card__btn-del');
  elementCardImage.src = card.link;
  elementCardTitle.textContent = card.name;
  elementCardLikeIcon.addEventListener('click', () => cardLikeIcon(elementCardLikeIcon));
  elementCardDelete.addEventListener('click', () => deleteCard(elementCardDelete));
  elementCardImage.addEventListener('click', () => openPopupZoomImage(card));
  return elementCard;
}

//  рендеринг карточек

const renderCard = card => cardElements.prepend(card);

// лайк карточек

function cardLikeIcon(elementCardLikeIcon) {
  elementCardLikeIcon.classList.toggle('card__like-icon_action_like');
}

// удаление карточки

function deleteCard(elementCardDelete) {
  elementCard = elementCardDelete.closest('.card');
  elementCard.remove();
}

// функции открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  
}  

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupProfile() {
  usernameInput.value = profileUsername.textContent;
  userAboutInput.value = profileUserAbout.textContent;
  openPopup(popupEditProfile);
}

function openPopupZoomImage(card) {
  cardImageZoom.src = card.link;
  cardImageZoomDescription.textContent = card.name;
  openPopup(popupZoomImage);
}

// функция редактирование попапа профиля

function submitFormEditProfile (evt) {
  evt.preventDefault();
  profileUsername.textContent = usernameInput.value;
  profileUserAbout.textContent = userAboutInput.value;
  closePopup(popupEditProfile);
}

// функция  ввода данных через попап и добавления карточки

function submitFormAddCard (evt) {
  evt.preventDefault();
  const card = { 
    name: cardNameInput.value, 
    link: cardLinkInput.value 
  };
  renderCard(createCard(card));
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopup(popupAddCard);
}

formElementEditProfile.addEventListener('submit', submitFormEditProfile);
formElementAddCard.addEventListener('submit', submitFormAddCard);

openPopupEditBtn.addEventListener ('click', function () {
  openPopupProfile(popupEditProfile);
});
openPopupAddBtn.addEventListener ('click', function () {
  openPopup(popupAddCard);
});

closePopupEditBtn.addEventListener ('click', function () {
  closePopup(popupEditProfile);
});
closePopupAddBtn.addEventListener ('click', function () {
  closePopup(popupAddCard);
});
closePopupZoomBtn.addEventListener ('click', function () {
  closePopup(popupZoomImage);
});

initialCards.forEach(card => renderCard(createCard(card)));


// const ESC_KEY = 'Escape';

// function onDocumentKeyUp(event) {
//   if (event.key === ESC_KEY) {
//       popupClose();
//   }
// }

// document.addEventListener('keyup', onDocumentKeyUp);
// document.removeEventListener('keyup', onDocumentKeyUp);