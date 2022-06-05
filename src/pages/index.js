import { validationConfig } from "../components/initial.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css';
import PopupWithConfirm from "../components/PopupWithConfirm.js";

//  селекторы

const popupEditProfile = '.popup_edit-profile';
const popupAddCard = '.popup_add-card';
const popupZoomImage = '.popup_zoom-photo';
const popupAvatarEditProfile = '.popup_update-avatar';
const popupConfirm = '.popup_confirm';
const userNameSelector = '.profile__profile-info-username';
const userAboutSelector = '.profile__profile-info-user-about';
const userAvatarSelector = '.profile__avatar';

// элементы

const popupOpenEditBtn = document.querySelector('.profile__edit-button');
const popupOpenAddBtn = document.querySelector('.profile__add-button');
const popupOpenAvatarEditBtn = document.querySelector('.profile__avatar-edit-button');
const formElementEditProfile = document.querySelector('.popup__form_type_edit-profile');
const userNameInput = formElementEditProfile.querySelector('.popup__userinfo_info_username');
const userAboutInput = formElementEditProfile.querySelector('.popup__userinfo_info_user-about');
const formElementAddCard = document.querySelector('.popup__form_type_add-card');
const formElementAvatarEditProfile = document.querySelector('.popup__form_type_update-avatar');
const cardElements = document.querySelector('.elements');

let userId = null;
let currentCard = null;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '7588dad3-b90e-40e4-b6a0-ebc853bfd583',
    'Content-Type': 'application/json'
  }
});

api.getInitialData()
  .then((data) => {
    const [ userInfoData, cardsData ] = data;
    userInfo.setUserInfo(userInfoData);
    userId = userInfoData._id;
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })

const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleClickCard: () => {
        popupImage.open(data);
      },
      handleLikeCard: (data) => {
        if (!card.isLiked()) {
          api.setLikeCard(data)
            .then((data) => {
              card.setLikeCountCard(data);
            })
            .catch((err) => {
              console.log(err);
            })
        } else { 
          api.deleteLikeCard(data)
            .then((data) => {
              card.setLikeCountCard(data);
            })
            .catch((err) => {
              console.log(err);
            })
        }  
      },
      handleDeleteCard: (data) => {
        currentCard = card;
        popupWithConfirmElement.open(data);
      }
    }, 
    '#card-template', 
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
  
};

const cardsList = new Section({
  renderer: (cardItem) => {
    cardsList.addItem(createCard(cardItem), 'append');
  }
}, cardElements
);

const userInfo = new UserInfo({  userNameSelector, userAboutSelector, userAvatarSelector});

const popupWithConfirmElement = new PopupWithConfirm({
  popupSelector: popupConfirm,
  submitForm: (data) => {
    popupWithConfirmElement.renderLoading(true);
    api.deleteCard(data)
      .then(() => {
        currentCard.handleDeleteCard();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithConfirmElement.renderLoading(false);
        popupWithConfirmElement.close();
      })
  }
});
popupWithConfirmElement.setEventListeners();

const popupImage = new PopupWithImage(popupZoomImage);
popupImage.setEventListeners();

const popupEditProfileElement = new PopupWithForm({
  popupSelector: popupEditProfile,
  submitForm: (data) => {
    popupEditProfileElement.renderLoading(true);
    api.setUserInfoApi(data)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfileElement.renderLoading(false);
        popupEditProfileElement.close();
      })
  }
});
popupEditProfileElement.setEventListeners();

popupOpenEditBtn.addEventListener('click', () => {
  formValidatorEditProfile.resetFormValidation();
  const userData = userInfo.getUserInfo();
  userNameInput.value = userData.name;
  userAboutInput.value = userData.about;
  popupEditProfileElement.open();
});

const popupAvatarEditProfileElement = new PopupWithForm({
  popupSelector: popupAvatarEditProfile,
  submitForm: (data) => {
    popupAvatarEditProfileElement.renderLoading(true);
    api.setUserAvatarApi(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatarEditProfileElement.renderLoading(false);
        popupAvatarEditProfileElement.close();
      })
  }
});
popupAvatarEditProfileElement.setEventListeners();

popupOpenAvatarEditBtn.addEventListener('click', () => {
  formValidatorAvatarEditProfile.resetFormValidation();
  popupAvatarEditProfileElement.open();
});

const popupAddCardElement = new PopupWithForm({
    popupSelector: popupAddCard,
    submitForm: (data) => {
      popupAddCardElement.renderLoading(true);
      api.postCard(data)
        .then((data) => {
          cardsList.addItem(createCard(data), 'prepend');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAddCardElement.renderLoading(false);
          popupAddCardElement.close();
        })
    }
  });
popupAddCardElement.setEventListeners();  

popupOpenAddBtn.addEventListener('click', () => {
  formValidatorAddCard.resetFormValidation();
  popupAddCardElement.open();
});

const formValidatorEditProfile = new FormValidator(validationConfig, formElementEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddCard = new FormValidator(validationConfig, formElementAddCard);
formValidatorAddCard.enableValidation();

const formValidatorAvatarEditProfile = new FormValidator(validationConfig, formElementAvatarEditProfile);
formValidatorAvatarEditProfile.enableValidation();

