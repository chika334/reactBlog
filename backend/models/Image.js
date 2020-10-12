const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  // _id: {
  //   type: Schema.Types.ObjectId
  // },
  // _id: Schema.Types.ObjectId,
  originalname: String,
  mimetype: String,
  filename: String,
  path: String,
});

const Image = mongoose.model('Image', imageSchema);

exports.Image = Image