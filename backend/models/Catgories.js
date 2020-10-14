const mongoose = require("mongoose")

const Blogcategory = new mongoose.Schema({
  category: {
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

module.exports = mongoose.model("Category", Blogcategory)