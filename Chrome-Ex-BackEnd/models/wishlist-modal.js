const {Schema, model} = require('mongoose');

const WishlistItemsSchema = new Schema({
  url: {type: String},
  nameURL: {type: String},
})

const WishlistSchema = new Schema({
  userId: {type: String},
  name: {type: String},
  items: [WishlistItemsSchema],
});

module.exports = model('Wishlist', WishlistSchema);
