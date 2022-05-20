export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector}) {
    this._profileUserName = document.querySelector(userNameSelector);
    this._profileUserAbout = document.querySelector(userAboutSelector);
  };

  getUserInfo() {
    const userInfo = {
      userName: this._profileUserName.textContent,
      userAbout: this._profileUserAbout.textContent
    }
    return userInfo;
  };

  setUserInfo(userName, userAbout) {
    this._profileUserName.textContent = userName;
    this._profileUserAbout.textContent = userAbout;
  };
}