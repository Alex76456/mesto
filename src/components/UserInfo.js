export default class UserInfo {
  constructor(name, job, avatar) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
    this._userId;
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
      id: this._userId
    }
    return this._userInfo;
  }


  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
    this._userId = _id;
  }


  setUserAvatar(avatarLink) {
    this._avatar.src = avatarLink;
    this._avatar.alt = this._name;
  }

}