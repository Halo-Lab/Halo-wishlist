const { Schema, model } = require('mongoose');

const ArchiveItemsSchema = new Schema({
  url: { type: String },
  nameURL: { type: String },
  image: { type: String },
  price: { type: String },
});

const ArchiveSchema = new Schema({
  userId: { type: String },
  items: [ArchiveItemsSchema],
});

module.exports = model('Archive', ArchiveSchema);
