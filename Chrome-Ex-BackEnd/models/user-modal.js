const {Schema, model} = require('mongoose');

const WishListSchema = new Schema({
  userId: {type: String}
})

const UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
  wishlist: [WishListSchema],
  name: {type: String, default: ''},
  bio: {type: String, default: ''},
  date: {type: Date, default: ''},
  userPic: {type: String, default: ''},
  nickName: {type: String, default: ''},
  facebook: {type: String, default: ''},
  instagram: {type: String, default: ''},
  twitter: {type: String, default: ''},
});

module.exports = model('User', UserSchema);
