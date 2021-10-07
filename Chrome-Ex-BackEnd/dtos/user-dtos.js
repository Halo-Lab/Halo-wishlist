module.exports = class UserDto {
  email;
  id;
  isActivated;
  wishList;

  constructor(modal) {
    this.email = modal.email;
    this.id = modal._id;
    this.isActivated = modal.isActivated;
    this.wishList = modal.wishList;
  }
};
