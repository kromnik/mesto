export default class UserInfo {
  constructor({ userNameInput, userAboutInput}) {
    this._userNameInput = userNameInput;
    this._userAboutInput = userAboutInput;
    this._profileUserName = document.querySelector('.profile__profile-info-username');
    this._profileUserAbout = document.querySelector('.profile__profile-info-user-about');
  };

  getUserInfo() {
    this._userNameInput.value = this._profileUserName.textContent;
    this._userAboutInput.value = this._profileUserAbout.textContent; 
  };

  setUserInfo() {
    this._profileUserName.textContent = this._userNameInput.value;
    this._profileUserAbout.textContent = this._userAboutInput.value;
  };
}