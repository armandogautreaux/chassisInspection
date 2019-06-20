const dotenv = require('dotenv');
dotenv.config();
//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('./passport');
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');

//PORT
const PORT = process.env.PORT || 8080;

//MIDLEWARE MORGAN
app.use(morgan('dev'));

//MIDLEWARE - USING EXPRESS INSTEAD OF 'BODYPARSER'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// MONGOOSE CONNECTION
mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost/legalassistant',
  { useNewUrlParser: true }
);

// Passport
app.use(passport.initialize());

//Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//CIRCULAR DEPENDENCY TO USE ROUTES
app.use(routes);

//INITIALIZE APP
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
