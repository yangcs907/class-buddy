const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/userRoutes.js');
const course = require('./routes/courseRoutes.js');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys.js').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MongoDB")})
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());
// passport config
require('./config/passport.js')(passport);

// Use routes
app.use('/users', users);
app.use('/course', course);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
