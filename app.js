var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require('passport');
var multer = require('multer');
var Images = require("./models/images");
var User = require("./models/users.js");
var upload = require("./models/multer");
var MongoStore = require("connect-mongo");
var connectEnsureLogin = require('connect-ensure-login');
var flash = require("connect-flash");
var methodOverride        = require("method-override");
var fs = require('fs');
var path = require('path');
require('dotenv/config');
const URL = "mongodb+srv://Catalyst:Randomshap197@neon.chpcu.mongodb.net/Neon?retryWrites=true&w=majority";
var conn = mongoose.connect(URL ,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
conn.catch(err => console.log(err))
mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var sessionStore = MongoStore.create({
    mongoUrl: URL,
    collection: "sessions"
});
var expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie:{
            maxAge: 1000 * 60 * 60 * 5
        }
});
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Routes
var routes = require("./routes/index");
app.use(routes);



app.listen( process.env.PORT || 400 , '0.0.0.0', function(){
    console.log("You are welcome to naija")
});