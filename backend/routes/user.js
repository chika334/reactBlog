const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const nodemailer = require('nodemailer')

router.get('/loadUser', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-Hashed_password -salt')
  res.json(user)
})

// signup
router.post('/signup', (req, res) => {
  // get the request body
  const {name, email, password} = req.body;
  // check if all inputs are filled
  if (name === "" || email === "" || password === "") {
    return res.status(400).json({
      msg: "Input all fields"
    })
  }
  // check if email already exists
  User.findOne({email}).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        msg: "Email is Taken"
      })
    }

    // register new user
    user = new User ({name, email, password})
    user.save();
    const {role} = user;
    const token = user.generateAuthToken();
    return res.status(200).json({
      user: {name, email, password, role},
      token,
      msg: "Signup Successful"
    })
  })
})


// signin user
router.post('/signin', (req, res) => {
  // get request body
  const {email, password} = req.body;
  // check if all inputs are filled 
  if(email === "" || password === "") {
    return res.status(400).json({
      msg: "Input all fields"
    })
  }

  // check if email exists
  User.findOne({email}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        msg: "User with that email does not exist"
      })
    }

    // checks if email and password are correct
    if(!user.authenticate(password)) {
      return res.status(400).json({
        msg: "Email and password do not match"
      })
    }

    // generate token
    const token = user.generateAuthToken()
    const {name, email, role} = user
    res.status(200).json({
      user: {email, name, role},
      token
    })
  })
})

router.post("/forgot", (req, res) => {
  const {email} = req.body;
  User.findOne({email}, (err, user) => {
    if(err || !user) {
      res.status(400).json({
        msg: "User with that email does not exist"
      })
    }

    const token = user.generateAuthToken()

    async function main() {

      const output = `
        <p>Please use the following link to reset your password: </p>
        <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
        <hr />
        <p>This email may contain sensitive information</p>
      `;

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: `neilbloguser@gmail.com`, // generated ethereal user
          pass: 'johnCENA19', // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let info = await transporter.sendMail({
        to: email, // list of receivers
        from: process.env.EMAIL_FROM, // sender address
        subject: `Password reset link`, // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
      });

      return user.updateOne({ resetPasswordLink: token }, (err, success) => {
        if (err) {
          return res.json({ error: console.log(err)})
        } else {
          res.status(200).json({
            msg: `Email has been sent to ${email}. Follow the instructions to reset your password.`
          });
        }
      })
    }
    main().catch(console.error);
  })
});

module.exports = router;