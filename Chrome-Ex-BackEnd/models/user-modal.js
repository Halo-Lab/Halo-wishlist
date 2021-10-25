const {Schema, model} = require('mongoose');

const WishListSchema = new Schema({
  userId: {type: String}
})

const UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
  wishList: [WishListSchema],
});

module.exports = model('User', UserSchema);
