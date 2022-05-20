import { initialCards, validationConfig } from "../components/initial.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

//  селекторы

const popupEditProfile = '.popup_edit-profile';
const popupAddCard = '.popup_add-card';
const popupZoomImage = '.popup_zoom-photo';
const userNameSelector = '.profile__profile-info-username';
const userAboutSelector = '.profile__profile-info-user-about';

// элементы

const popupOpenEditBtn = document.querySelector('.profile__edit-button');
const popupOpenAddBtn = document.querySelector('.profile__add-button');
const formElementEditProfile = document.querySelector('.popup__form_type_edit-profile');
const userNameInput = formElementEditProfile.querySelector('.popup__userinfo_info_username');
const userAboutInput = formElementEditProfile.querySelector('.popup__userinfo_info_user-about');
const formElementAddCard = document.querySelector('.popup__form_type_add-card');
const cardElements = document.querySelector('.elements');


const popupImage = new PopupWithImage(popupZoomImage);
popupImage.setEventListeners();

const handleCardClick = (link, name) => {
  popupImage.open(link, name);
}

// функция создания экземпляра класса карточки

function createCard(elementCard) {
  const card = new Card(elementCard, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const userInfo = new UserInfo({  userNameSelector, userAboutSelector });

const popupEditProfileElement = new PopupWithForm({
  popupSelector: popupEditProfile,
  submitForm: (data) => {
    userInfo.setUserInfo(data.userName, data.userNameInfo);
    popupEditProfileElement.close();
  }
});

popupEditProfileElement.setEventListeners();

popupOpenEditBtn.addEventListener('click', () => {
  formValidatorEditProfile.resetFormValidation();
  const userData = userInfo.getUserInfo();
  userNameInput.value = userData.userName;
  userAboutInput.value = userData.userAbout;
  popupEditProfileElement.open();
});

const popupAddCardElement = new PopupWithForm({
    popupSelector: popupAddCard,
    submitForm: (data) => {
      cardsList.addItem(createCard(data), 'prepend');
      popupAddCardElement.close();
    }
  });

popupAddCardElement.setEventListeners();  

popupOpenAddBtn.addEventListener('click', () => {
  formValidatorAddCard.resetFormValidation();
  popupAddCardElement.open();
});

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      cardsList.addItem(createCard(cardItem), 'append');
    }
  }, cardElements
);
cardsList.renderItems();

const formValidatorEditProfile = new FormValidator(validationConfig, formElementEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddCard = new FormValidator(validationConfig, formElementAddCard);
formValidatorAddCard.enableValidation();

