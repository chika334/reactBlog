const mongoose = require("mongoose")

const Blogtag = new mongoose.Schema({
  tag: {
    type: String,
    max: 50,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    index: true
  }
}, {timestamp: true})

module.exports = mongoose.model("Tag", Blogtag)