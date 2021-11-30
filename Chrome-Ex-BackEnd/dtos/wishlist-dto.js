module.exports = class WishlistDto {
  _id;
  userId;
  name;
  items;
  userName;
  date;
  userPic;
  
 constructor(modal, user) {
    this.items = modal.items; 
    this.userId = modal.userId;
    this._id = modal._id;
    this.name = modal.name;
    this.userName = user.name;
    this.date = user.date;
    this.userPic = user.userPic;
  }
};
