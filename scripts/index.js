import { initialCards, validationConfig } from "./initial.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//  попапы

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupZoomImage = document.querySelector('.popup_zoom-photo');
const popupList = Array.from(document.querySelectorAll('.popup'));

// кнопки

const popupOpenEditBtn = document.querySelector('.profile__edit-button');
const popupOpenAddBtn = document.querySelector('.profile__add-button');
const popupCloseEditBtn = popupEditProfile.querySelector('.popup__close-button_type_edit');
const popupCloseAddBtn = popupAddCard.querySelector('.popup__close-button_type_add');
const popupCloseZoomBtn = popupZoomImage.querySelector('.popup__close-button_type_zoom');

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

const cardElements = document.querySelector('.elements');

// функции открытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}  

function openPopupProfile() {
  usernameInput.value = profileUsername.textContent;
  userAboutInput.value = profileUserAbout.textContent;
  openPopup(popupEditProfile);
}

function openPopupZoomImage(link, name) {
  cardImageZoom.src = link;
  cardImageZoomDescription.textContent = name;
  cardImageZoom.alt = "увеличенное фото " + name;
  openPopup(popupZoomImage);
}

//  функции закрытия попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

// закрытие на оверлэй

const handleOverlayClose = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

// закрытие на ESC

function onDocumentKeyUp(evt) {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);  
  }
}

// функция создания экземпляра класса карточки

function createCard(elementCard) {
  const card = new Card(elementCard, '#card-template', openPopupZoomImage);
  const cardElement = card.generateCard();
  return cardElement;
}

// функция редактирование попапа профиля 

function submitFormEditProfile(evt) {
  evt.preventDefault();
  profileUsername.textContent = usernameInput.value;
  profileUserAbout.textContent = userAboutInput.value;
  closePopup(popupEditProfile);  
}

// функция  ввода данных через попап и добавления карточки

function submitFormAddCard(evt) {
  evt.preventDefault();
  const elementCard = { 
    name: cardNameInput.value, 
    link: cardLinkInput.value 
  };
  cardElements.prepend(createCard(elementCard));
  closePopup(popupAddCard);
}

popupList.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => handleOverlayClose(evt));
});

formElementEditProfile.addEventListener('submit', submitFormEditProfile);
formElementAddCard.addEventListener('submit', submitFormAddCard);

popupOpenEditBtn.addEventListener('click', function () {
  formValidatorEditProfile.resetFormValidation();
  openPopupProfile(popupEditProfile);
});
popupOpenAddBtn.addEventListener('click', function () {
  formElementAddCard.reset();
  formValidatorAddCard.resetFormValidation();
  openPopup(popupAddCard);
});

popupCloseEditBtn.addEventListener('click', function () {
  closePopup(popupEditProfile);
});
popupCloseAddBtn.addEventListener ('click', function () {
  closePopup(popupAddCard);
});
popupCloseZoomBtn.addEventListener('click', function () {
  closePopup(popupZoomImage);
});

initialCards.forEach((item) => {
  cardElements.append(createCard(item));
});

const formValidatorEditProfile = new FormValidator(validationConfig, formElementEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddCard = new FormValidator(validationConfig, formElementAddCard);
formValidatorAddCard.enableValidation();

