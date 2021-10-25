const {Schema, model} = require('mongoose');

const WishListItemsSchema = new Schema({
  url: {type: String},
  nameURL: {type: String},
})

const WishlistSchema = new Schema({
  name: {type: String},
  items: [WishListItemsSchema],
});

module.exports = model('Wishlist', WishlistSchema);
