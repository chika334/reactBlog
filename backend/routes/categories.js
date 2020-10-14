const Category = require("../models/Catgories")
const express = require("express")
const router = express.Router()
const slugify = require("slugify")

router.post("/create-categories", (req, res) => {
  const {category} = req.body
  const slug = slugify(category).toLowerCase();

  Category.findOne({category}).exec((err, data) => {
    if(data) {
      return res.status(400).json({
        msg: "Category already exist"
      })
    }

    let categorys = new Category({
      category,
      slug
    })

    categorys.save()
    return res.status(200).json({
      msg: "Category successfully created",
      data: {category, slug}
    })
  })
})

module.exports = router;