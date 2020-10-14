const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const multer = require('multer')

router.post('/update', (req, res) => {
  console.log(req)
  // User.findOne({email: req.body.email}, (err, user) => {
  //   if (err || !user) {
  //     return res.status(400).json({
  //       msg: "User with that email does not exist"
  //     })
  //   }

  //   user.updateOne({about: req.body.about, username: req.body.uname}, (err, success) => {
  //     if (err) {
  //       return res.json({ error: console.log(err)})
  //     } else {
  //       res.status(200).json({
  //         msg: `Thanks for updating your profile`
  //       });
  //     }
  //   })
  // })
})

let Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true)
  }
})

const uploads = multer({ storage: Storage });

router.post("/updateImage",uploads.single('profileImage'),function(req,res,next){

  var id=req.body.user_id;
     var profilePic= req.file.path;
     User.findById(id,function(err,data){
 
      // data.profileImage=profilePic?profilePic:data.profileImage;
      data.profileImages=`${process.env.BACKEND_URL}/` + profilePic;

      data.profileImage=profilePic?profilePic:data.profileImage;

        data.save()
          .then(doc=>{
            res.status(200).json({
              msg:"Profile Updated Successfully",
              // doc
            });
          })
          .catch(err=>{
            res.json(err);
          })
     });
  // console.log(req)
});

router.get("/loadImage", auth, function(req,res,next){

  var id=req.params.userid;
  var getUserDetails= User.find({_id:id},{'email':1,'profileImages':1});
  getUserDetails.exec()
  .then(doc=>{
    res.status(200).json({
      msg:"OK",
      // doc
    });
  })
  .catch(err=>{
      res.json(err);
  })
});

module.exports = router;