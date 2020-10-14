const Tag = require("../models/Tag")
const express = require("express")
const router = express.Router()
const slugify = require("slugify")

router.post("/create-tag", (req, res) => {
  const {category} = req.body
  const slug = slugify(category).toLowerCase();

  Tag.findOne({tag}).exec((err, data) => {
    if(data) {
      return res.status(400).json({
        msg: "Tag already exist"
      })
    }

    let tags = new Tag({
      category,
      slug
    })

    tags.save()
    return res.status(200).json({
      msg: "Tag successfully created",
      data: {tag, slug}
    })
  })
})

module.exports = router;