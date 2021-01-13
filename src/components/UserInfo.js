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

  setUserInfo(newName, newJob, newAvatar = this._avatar.src, id) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
    this._avatar.src = newAvatar;
    this._avatar.alt = newName;
    this._userId = id;
  }

}