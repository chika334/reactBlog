const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose =  require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

// routes
const users = require('./routes/user')
const update = require('./routes/update')
const categories = require("./routes/categories")
const tag = require("./routes/tag")

// middleware
app.use(cors({origin: true, credentials: true}));
// if (`${process.env.NODE_ENV}` === 'development') {
  // app.use(cors({origin: `${process.env.CLIENT_URL}`}));
// }
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev'))

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))

app.use(express.json());
app.use('/api', users)
app.use('/api', update)
app.use('/api', categories)
app.use('/api', tag)

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})