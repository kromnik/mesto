//  попапы

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupZoomImg = document.querySelector('.popup_zoom-photo');

// кнопки

const openPopupEditBtn = document.querySelector('.profile__edit-button');
const openPopupAddBtn = document.querySelector('.profile__add-button');
const closePopupEditBtn = document.querySelector('.popup__close-button_type_edit');
const closePopupAddBtn = document.querySelector('.popup__close-button_type_add');
const closePopupZoomBtn = document.querySelector('.popup__close-button_type_zoom');


// редактирование профиля  и добавление карточки

let formElementEdProf = document.querySelector('.popup__form_type_edit-profile');
let usernameInput = formElementEdProf.querySelector('.popup__userinfo_info_username');
let userAboutInput = formElementEdProf.querySelector('.popup__userinfo_info_user-about');
let profileUsername = document.querySelector('.profile__profile-info-username');
let profileUserAbout = document.querySelector('.profile__profile-info-user-about');
let formElementAddCard = document.querySelector('.popup__form_type_add-card');
let cardNameInput = formElementAddCard.querySelector('.popup__userinfo_card_name');
let cardLinkInput = formElementAddCard.querySelector('.popup__userinfo_card_link');


//  первичное добавление карточек

const cardTemplate = document.querySelector('#card-template').content;
const cardElements = document.querySelector('.elements');

// zoom фото

const cardImgZoom = popupZoomImg.querySelector('.popup__image-zoom');
const cardImgZoomDesc = popupZoomImg.querySelector('.popup__image-zoom-description');

// исходный массив 

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функция создания карточек

function createCard (card) {
  const elementCard = cardTemplate.querySelector('.card').cloneNode(true);
  const elementCardImg = elementCard.querySelector('.card__image');
  const elementCardTitle = elementCard.querySelector('.card__title');
  const elementCardLikeIcon = elementCard.querySelector('.card__like-icon');
  const elementCardDel = elementCard.querySelector('.card__btn-del');
  elementCardImg.src = card.link;
  elementCardTitle.textContent = card.name;
  elementCardLikeIcon.addEventListener('click', () => cardLikeIcon(elementCardLikeIcon));
  elementCardDel.addEventListener('click', () => cardDel(elementCardDel));
  elementCardImg.addEventListener('click', () => popupOpenZoomImg(card));
  return elementCard;
}

//  рендеринг карточек

const renderCard = card => cardElements.prepend(card);

// лайк карточек

function cardLikeIcon(elementCardLikeIcon) {
  elementCardLikeIcon.classList.toggle('card__like-icon_action_like');
}

// удаление карточки

function cardDel(elementCardDel) {
  elementCard = elementCardDel.closest('.card');
  elementCard.remove();
}

// функции открытия и закрытия попапов

function popupOpen(popup) {
  popup.classList.add('popup_opened');
  usernameInput.value = profileUsername.textContent;
  userAboutInput.value = profileUserAbout.textContent;
}  

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

function popupOpenZoomImg(card) {
  cardImgZoom.src = card.link;
  cardImgZoomDesc.textContent = card.name;
  popupOpen(popupZoomImg);
}

// функция редактирование попапа профиля

function formSubmitEdProf (evt) {
  evt.preventDefault();
  profileUsername.textContent = usernameInput.value;
  profileUserAbout.textContent = userAboutInput.value;
  popupClose(popupEditProfile);
}

// функция  ввода данных через попап и добавления карточки

function formSubmitAddCard (evt) {
  evt.preventDefault();
  const card = { 
    name: cardNameInput.value, 
    link: cardLinkInput.value 
  };
  renderCard(createCard(card));
  cardNameInput.value = '';
  cardLinkInput.value = '';
  popupClose(popupAddCard);
}

formElementEdProf.addEventListener('submit', formSubmitEdProf);
formElementAddCard.addEventListener('submit', formSubmitAddCard);

openPopupEditBtn.addEventListener ('click', function () {
  popupOpen(popupEditProfile);
});
openPopupAddBtn.addEventListener ('click', function () {
  popupOpen(popupAddCard);
});

closePopupEditBtn.addEventListener ('click', function () {
  popupClose(popupEditProfile);
});
closePopupAddBtn.addEventListener ('click', function () {
  popupClose(popupAddCard);
});
closePopupZoomBtn.addEventListener ('click', function () {
  popupClose(popupZoomImg);
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