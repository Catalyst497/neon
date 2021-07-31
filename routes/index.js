var router = require("express").Router(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    multer = require('multer'),
    Images = require("../models/images"),
    upload = require("../models/multer"),
    fs = require('fs'),
    path = require('path'),
    connectEnsureLogin = require('connect-ensure-login'),
    User = require("../models/users");



router.get("/", function (req,res){
      res.render("Home Page")        
});
router.get("/login", function(req,res){
  res.render("login", {error:req.flash.error});
});
router.post("/login", function(req,res,next){
    passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
        // req.flash("error", err.message);
      return res.redirect('/login');
    }

    req.logIn(user, function(err) {
      if (err) {
        
        console.log(err);
        req.flash("error", err.message);
        return res.redirect("/login");
      }
      req.flash("success", "Welcome " + user.username);
      return res.redirect('/edit');
    });

  })(req, res, next);
});

router.get("/logout", function(req,res){
    req.logout();
    // req.flash("success", "Succesfully logged out!!");
    res.redirect("/");
});


router.get("/gallery", function(req,res){
    Images.find(
        {}, 
        function(err,images){
          if(err){
            console.log(err);
          }else{
             res.render("Gallery", {images:images});
          }
        }
      )


})

router.get("/edit", isLoggedIn, function(req,res){
  Images.find(
        {}, 
        function(err,images){
          if(err){
            console.log(err);
          }else{
             res.render("edit", {images:images});
          }
        }
      )})
router.post("/edit", isLoggedIn, upload.single('image'), function(req,res){
    var obj = {
        img: {
            data: fs.readFileSync(path.join( __dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Images.create(obj, function(err, item){
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            // console.log(item.img.data.toString('base64'));
            res.redirect('/edit');
        }
    });
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error", "You have to login first :)");
    res.redirect("/login");
}
module.exports = router;





// router.get("/register", function(req,res){
//   res.render("register");
// })


// router.post("/register", function(req,res){
//    var newUser = ({username: req.body.username});
//     User.register(
//         newUser,
//         req.body.password, function(err, user) {
//             if (err) {
//                 console.log(err);
//                 // req.flash("error", err.message);
//                 return res.redirect("/register");
//             }
//             passport.authenticate("local")(req, res, function () {
//                 // req.flash("success", "Welcome to Yelpcamp " + user.username );
//                 res.redirect("/edit")
//             })
//         }
//     )
// })