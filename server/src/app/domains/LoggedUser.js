export default class LoggedUser {
  constructor({ userId = null, isAdmin = false } = {}) {
    this.userId = userId ? userId : null;
    this.isAdmin = isAdmin ? isAdmin : null;
  }
}
