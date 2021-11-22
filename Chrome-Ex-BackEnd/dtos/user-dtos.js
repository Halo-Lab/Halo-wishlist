module.exports = class UserDto {
  email;
  id;
  isActivated;
  wishlist;
  name;
  bio;
  date;
  userPic;
  nickName;

  constructor(modal) {
    this.email = modal.email;
    this.id = modal._id;
    this.isActivated = modal.isActivated;
    this.wishlist = modal.wishlist;
    this.name = modal.name;
    this.bio = modal.bio;
    this.date = modal.date;
    this.userPic = modal.userPic;
    this.nickName = modal.nickName;
  }
};
