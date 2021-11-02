module.exports = class UserDto {
  email;
  id;
  isActivated;
  wishlist;
  name;
  bio;
  date;

  constructor(modal) {
    this.email = modal.email;
    this.id = modal._id;
    this.isActivated = modal.isActivated;
    this.wishlist = modal.wishlist;
    this.name = modal.name;
    this.bio = modal.bio;
    this.date = modal.date;
  }
};
