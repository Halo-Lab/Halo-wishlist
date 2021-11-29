module.exports = class WishlistDto {
  id;
  userId;
  name;
  items;
  
 constructor(modal) {
    this.items = modal._id;
    this.items = modal.userId;
    this.items = modal.name;
    this.items = modal.items; 
  }
};