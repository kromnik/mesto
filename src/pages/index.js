import { initialCards, validationConfig } from "../components/initial.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

//  попапы

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupZoomImage = document.querySelector('.popup_zoom-photo');

// кнопки

const popupOpenEditBtn = document.querySelector('.profile__edit-button');
const popupOpenAddBtn = document.querySelector('.profile__add-button');

// редактирование профиля  и добавление карточки

const formElementEditProfile = document.querySelector('.popup__form_type_edit-profile');
const userNameInput = formElementEditProfile.querySelector('.popup__userinfo_info_username');
const userAboutInput = formElementEditProfile.querySelector('.popup__userinfo_info_user-about');
const formElementAddCard = document.querySelector('.popup__form_type_add-card');
const cardNameInput = formElementAddCard.querySelector('.popup__userinfo_card_name');
const cardLinkInput = formElementAddCard.querySelector('.popup__userinfo_card_link');

//  первичное добавление карточек

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

const userInfo = new UserInfo({ userNameInput, userAboutInput });

const popupEditProfileElement = new PopupWithForm({
  popupSelector: popupEditProfile,
  submitForm: () => {
    userInfo.setUserInfo();
    popupEditProfileElement.close();
  }
});

popupEditProfileElement.setEventListeners();

popupOpenEditBtn.addEventListener('click', () => {
  formValidatorEditProfile.resetFormValidation();
  userInfo.getUserInfo();
  popupEditProfileElement.open();
});

const popupAddCardElement = new PopupWithForm({
    popupSelector: popupAddCard,
    submitForm: (formData) => {
      formData.name = cardNameInput.value, 
      formData.link = cardLinkInput.value 
      cardElements.prepend(createCard(formData));
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
      cardsList.addItem(createCard(cardItem));
    }
  }, cardElements
);
cardsList.renderItems();

const formValidatorEditProfile = new FormValidator(validationConfig, formElementEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddCard = new FormValidator(validationConfig, formElementAddCard);
formValidatorAddCard.enableValidation();

