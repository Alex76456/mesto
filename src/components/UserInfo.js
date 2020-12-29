export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    return this._userInfo;
  }

  setUserInfo(name, job) {
    this._userInfo.name = name;
    this._userInfo.job = job;
  }
}