let express = require("express");
(app = express()),
  (bodyParser = require("body-parser")),
  (mongoose = require("mongoose")),
  (passport = require("passport")),
  (multer = require("multer")),
  (Images = require("./models/images")),
  (User = require("./models/users.js")),
  (upload = require("./models/multer")),
  (MongoStore = require("connect-mongo")),
  (connectEnsureLogin = require("connect-ensure-login")),
  (requestIp = require("request-ip")),
  (flash = require("connect-flash")),
  (methodOverride = require("method-override")),
  (fs = require("fs")),
  (path = require("path"));

require("dotenv").config();
const URL = process.env.DATABASE_URL;
mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("mongodb is connected");
  }
);

mongoose.set("useFindAndModify", false);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
let sessionStore = MongoStore.create({
  mongoUrl: URL,
  collection: "sessions",
});
let expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 5,
  },
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
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.message = req.flash("message");
  res.locals.deleted = req.flash("deleted");
  res.locals.added = req.flash("added");
  res.locals.cartMessage = req.flash("cartMessage");
  next();
});

//Routes
let routes = require("./routes/index");
app.use(routes);
app.get('/*', function(req, res){
  res.render('error');
})
const PORT = process.env.PORT || 400;
app.listen(PORT, "0.0.0.0", function () {
  console.log(`App running on port ${PORT}`);
});
