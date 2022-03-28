let express = require("express");
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
passport = require('passport'),
multer = require('multer'),
Images = require("./models/images"),
User = require("./models/users.js"),
upload = require("./models/multer"),
MongoStore = require("connect-mongo"),
connectEnsureLogin = require('connect-ensure-login'),
requestIp = require('request-ip'),
flash = require("connect-flash"),
methodOverride = require("method-override"),
fs = require('fs'),
path = require('path');
require('dotenv/config');
const URL = "mongodb+srv://Catalyst:Randomshap197@neon.chpcu.mongodb.net/Neon?retryWrites=true&w=majority";
let conn = mongoose.connect(URL ,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
conn.catch(err => console.log(err))
mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
let sessionStore = MongoStore.create({
    mongoUrl: URL,
    collection: "sessions"
});
let expressSession = require('express-session')({
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
let routes = require("./routes/index");
app.use(routes);

app.listen( process.env.PORT || 400 , '0.0.0.0', function(){
    console.log("You are welcome to naija")
});