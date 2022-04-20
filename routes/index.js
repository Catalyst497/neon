let router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  multer = require("multer"),
  Images = require("../models/images"),
  upload = require("../models/multer"),
  fs = require("fs"),
  path = require("path"),
  requestIp = require("request-ip"),
  connectEnsureLogin = require("connect-ensure-login"),
  Buyer = require("../models/buyers"),
  clientIp,
  User = require("../models/users");

router.get("/", function (req, res) {
  clientIp = requestIp.getClientIp(req);
  Buyer.find({ipAddress: clientIp}, function (err, currentBuyers) {
    if(!currentBuyers.length){
      Buyer.create({ ipAddress: clientIp });
      Images.find({}, function (err, images) {
      if (err) {
        console.log(err);
      } else {
        res.render("Home Page", { images: images.reverse() });
      }
    });
    }else{
      Images.find({}, function (err, images) {
      if (err) {
        console.log(err);
      } else {
        res.render("Home Page", { images: images.reverse() });
      }
    });
    }
  });
});
router.post("/", function (req, res) {
  Images.findById(req.body.id, function (err, img) {
    Buyer.find({ ipAddress: clientIp }, function (err, buyers) {
      buyers[0].cart.unshift(img);
      buyers[0].save();
      req.flash('added', 'Successfully Added to Cart');
      res.redirect('/#gallery');
    });
  });
});
router.get("/cart", function (req, res) {
  clientIp = requestIp.getClientIp(req);
  Images.find({}, function(err, imgs){
    Buyer.find({ ipAddress: clientIp })
    .populate("cart")
    .exec(function (err, buyers) {
      let commodities = buyers[0].cart;
      if (err) {
        console.log(err);
      }
      res.render("cart", { commodities: commodities, othercommodities: imgs });
    });
  })
});
router.delete("/delete-from-cart", function (req, res) {
  Buyer.find({ ipAddress: clientIp }, function (err, buyer) {
    buyer[0].cart = buyer[0].cart.filter(function (comm) {
      return comm.id != req.body.id;
    });
    buyer.save();
    res.redirect("/cart");
  });
});
router.get("/login", function (req, res) {
  res.render("login", { error: req.flash.error });
});
router.post("/login", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.redirect("/login");
    }

    req.logIn(user, function (err) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/login");
      }
      req.flash("success", "Welcome " + user.username);
      return res.redirect("/edit");
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Succesfully logged out!!");
  res.redirect("/");
});
router.get("/edit", isLoggedIn, function (req, res) {
  res.render("edit");
});
router.post("/edit", isLoggedIn, upload.single("image"), function (req, res) {
  var obj = {
    name: req.body.name,
    img: {
      data: fs.readFileSync(
        path.join(__dirname, "../" + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
    price: (!Number(req.body.price[0])) ? req.body.price.slice(1) : req.body.price,
    description: req.body.description,
    purchaseUrl: req.body.purchaseUrl,
  };
  Images.create(obj, (err, bag) => {
    if(err){
      console.log(err);
    }else{
      console.log(bag);
      res.redirect('/#gallery');
    }
  })
  // Images.create(obj, function (err, item) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/");
  //   }
  // });
});
router.delete("/:id", isLoggedIn, function (req, res) {
  Images.findByIdAndDelete(req.params.id, function (err, camp) {
    if (err) {
      res.redirect("/");
    } else {
      req.flash("success", "Deleted successfully");
      res.redirect("/#gallery");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
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
