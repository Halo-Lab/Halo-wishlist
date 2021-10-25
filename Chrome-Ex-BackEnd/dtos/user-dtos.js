module.exports = class UserDto {
  email;
  id;
  isActivated;
  wishlist;

  constructor(modal) {
    this.email = modal.email;
    this.id = modal._id;
    this.isActivated = modal.isActivated;
    this.wishlist = modal.wishlist;
  }
};
