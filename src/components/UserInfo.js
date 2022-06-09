export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector}) {
    this._profileUserName = document.querySelector(userNameSelector);
    this._profileUserAbout = document.querySelector(userAboutSelector);
    this._profileUserAvatar = document.querySelector(userAvatarSelector);
  };

  getUserInfo() {
    const userInfo = {
      name: this._profileUserName.textContent,
      about: this._profileUserAbout.textContent
    }
    return userInfo;
  };

  setUserInfo(data) {
    this._profileUserName.textContent = data.name;
    this._profileUserAbout.textContent = data.about;
    this._profileUserAvatar.src = data.avatar;
  };
}