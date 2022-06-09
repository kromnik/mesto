import { validationConfig as config } from "../utils/initial.js";
import { 
  popupEditProfile,
  popupAddCard,
  popupZoomImage,
  popupAvatarEditProfile,
  popupConfirm,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  popupOpenEditBtn,
  popupOpenAddBtn,
  popupOpenAvatarEditBtn,
  formElementEditProfile,
  formElementAddCard,
  formElementAvatarEditProfile,
  cardElements
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css';
import PopupWithConfirm from "../components/PopupWithConfirm.js";

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
        popupWithConfirmElement.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithConfirmElement.renderLoading(false);
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
        popupEditProfileElement.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfileElement.renderLoading(false);   
      })
  }
});
popupEditProfileElement.setEventListeners();

popupOpenEditBtn.addEventListener('click', () => {
  formValidators[ formElementEditProfile.getAttribute('name') ].resetFormValidation();
  const userData = userInfo.getUserInfo();
  popupEditProfileElement.setInputValues(userData);
  popupEditProfileElement.open();
});

const popupAvatarEditProfileElement = new PopupWithForm({
  popupSelector: popupAvatarEditProfile,
  submitForm: (data) => {
    popupAvatarEditProfileElement.renderLoading(true);
    api.setUserAvatarApi(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupAvatarEditProfileElement.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatarEditProfileElement.renderLoading(false);       
      })
  }
});
popupAvatarEditProfileElement.setEventListeners();

popupOpenAvatarEditBtn.addEventListener('click', () => {
  formValidators[ formElementAvatarEditProfile.getAttribute('name') ].resetFormValidation();
  popupAvatarEditProfileElement.open();
});

const popupAddCardElement = new PopupWithForm({
    popupSelector: popupAddCard,
    submitForm: (data) => {
      popupAddCardElement.renderLoading(true);
      api.postCard(data)
        .then((data) => {
          cardsList.addItem(createCard(data), 'prepend');
          popupAddCardElement.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAddCardElement.renderLoading(false);         
        })
    }
  });
popupAddCardElement.setEventListeners();  

popupOpenAddBtn.addEventListener('click', () => {
  formValidators[ formElementAddCard.getAttribute('name') ].resetFormValidation();
  popupAddCardElement.open();
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

