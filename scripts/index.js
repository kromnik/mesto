const popupElement = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-button');
const closePopup = document.querySelector('.popup__close-button');

const ESC_KEY = 'Escape';

function popupOpen() {
  popupElement.classList.add ('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function popupClose() {
  popupElement.classList.remove ('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
  if (event.key === ESC_KEY) {
      popupClose();
  }
}

openPopup.addEventListener ('click', (event) => {
  popupOpen()
}
);

closePopup.addEventListener ('click', popupClose);

let formElement = document.querySelector ('.popup__form');
let nameInput = formElement.querySelector ('.popup__username');
let jobInput = formElement.querySelector ('.popup__username-info');
let profileUsername = document.querySelector ('.profile__profile-info-username');
let profileUsernameInfo = document.querySelector ('.profile__profile-info-username-info');

nameInput.value = profileUsername.textContent;
jobInput.value = profileUsernameInfo.textContent;


function formSubmitHandler (evt) {
  evt.preventDefault();
  
  profileUsername.textContent = nameInput.value;
  profileUsernameInfo.textContent = jobInput.value;

  popupClose('submit');
  
}

formElement.addEventListener('submit', formSubmitHandler);