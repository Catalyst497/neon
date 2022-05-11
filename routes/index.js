let router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  multer = require("multer"),
  Images = require("../models/images"),
  Shoe = require('../models/shoes'),
  Cart = require('../models/cart'),
  upload = require("../models/multer"),
  fs = require("fs"),
  path = require("path"),
  requestIp = require("request-ip"),
  connectEnsureLogin = require("connect-ensure-login"),
  Buyer = require("../models/buyers"),
  clientIp,
  User = require("../models/users");
  require("dotenv").config();
  let itemsAll, images, shoes;
  
function othercommodities(items, req, res){
  clientIp = requestIp.getClientIp(req);
  let trxRef = "neon-" + Math.round(Math.random() * 10000000000000000);
  Images.find({}, function(err, imgs){
  if(err){
    console.log(err);
  }else{
    Buyer.find({ ipAddress: clientIp }, (err, buyers) => {
      const buyer= buyers[0];
      Shoe.find({}, function(err, shs){
        res.render('cart', { 
          commodities: items, 
          images: imgs, 
          shoes: shs,
          buyer: buyer,
          publicKey: process.env.PUBLIC_KEY,
          trxRef: trxRef
        })
      })
    })
  }
})
}
router.get("/", function (req, res) {
  clientIp = requestIp.getClientIp(req);
  Buyer.find({ipAddress: clientIp}, function (err, currentBuyers) {
    if(!currentBuyers.length){
      Buyer.create({ ipAddress: clientIp });
      Images.find({}, function (err, images) {
        Shoe.find({}, function(err, shoes){
          if (err) {
              console.log(err);
            } else {
              res.render("Home Page", { 
                images: images.reverse().slice(0, 6), 
                shoes: shoes.reverse().slice(0, 6) 
              });
            }
        })
    });
    }else{
      Images.find({}, function (err, images) {
        Shoe.find({}, function(err, shoes){
          if (err) {
              console.log(err);
            } else {
              res.render("Home Page", { 
                images: images, 
                shoes: shoes 
              });
            }
        })
    });
    }
  });
});
router.get('/bag/:items_id/edit', isLoggedIn, function(req, res){
  Images.findById(req.params.items_id, function(err, bag){
      res.render('edit-bag', { bagToEdit: bag });
  })
})
router.get('/shoe/:items_id/edit', isLoggedIn, function(req, res){
  Shoe.findById(req.params.items_id, function(err, shoe){
      res.render('edit-shoe', { shoeToEdit: shoe });
  })
})

router.put('/bag/:items_id', isLoggedIn, function(req, res){
  Images.findByIdAndUpdate(req.params.items_id, req.body.bag, {upsert: true}, function(err, item){
    console.log(item);
    if(err){
      console.log(err);
    }else{
    req.flash('message', 'Your bag is edited and updated.')
    res.redirect('/#gallery');
    }
  })
})
router.put('/shoe/:items_id', isLoggedIn, function(req, res){
  Shoe.findByIdAndUpdate(req.params.items_id, req.body.shoe, {upsert: true}, function(err, item){
    console.log(item);
    if(err) {
      console.log(err);
    }else {
    req.flash('message', 'Your shoe is edited and updated.')
    res.redirect('/#Shoes')
    }
  })
})
router.delete('/bag/:item_id', isLoggedIn, function(req, res){
  Images.findByIdAndRemove(req.params.item_id, function(err, deleted){
    if(err){
      console.log(err);
    }else{
    req.flash('deleted', 'Your bag item is deleted.')
      res.redirect('/#gallery');
    }
  })
})
router.delete('/shoe/:item_id', isLoggedIn, function(req, res){
  Shoe.findByIdAndRemove(req.params.item_id, function(err, deleted){
    if(err){
      console.log(err);
    }else{
    req.flash('deleted', 'Your shoe item is deleted.');
      res.redirect('/#Shoes');
    }
  })
})
router.post('/bag-to-cart', function(req,res){
  clientIp = requestIp.getClientIp(req);
  Images.findById(req.body.bag_id, function(err, bag){
    bag.ipAddress = clientIp;
    Cart.create({
      name: bag.name,
      price:bag.price,
      ipAddress: clientIp,
      img: bag.img,
      quantity: req.body.quantity
    }, function(err, cart_item){
      req.flash('success', "Your Bag is successfully added to cart. Click on 'View Cart' to open your cart.");
      res.redirect('/#gallery');
    })
  })
})
router.post('/shoe-to-cart', function(req,res){
  clientIp = requestIp.getClientIp(req);
  Shoe.findById(req.body.shoe_id, function(err, shoe){
    shoe.ipAddress = clientIp;
    Cart.create({
      name: shoe.name,
      price: shoe.price,
      ipAddress: clientIp,
      img: shoe.img,
      quantity: req.body.quantity
    }, function(err, shoe){
      req.flash('success', "Your Bag is successfully added to cart. Click on 'View Cart' to view your cart.");
      res.redirect('/#gallery');
    })
  })
})
router.delete('/:item_id/delete-from-cart', function(req, res){
  Cart.findByIdAndRemove(req.params.item_id, function(err, deleted){
    if(err){
      console.log(err);
    }else {
      req.flash('deleted', `${deleted.name} is deleted.`);
      res.redirect('/cart');
}
})
})
router.put('/:item_id/edit-cart', function(req, res){
  Cart.findByIdAndUpdate(req.params.item_id, { quantity: Number(req.body.quantity) }, {upsert: true}, function(err, updated){
    if(err){
      console.log(err);
    }else{
      req.flash('success', `${updated.name} is edited and updated.`);
      res.redirect('/cart');
    }
  })
})
router.get("/cart", function (req, res) {
  clientIp = requestIp.getClientIp(req);
  Cart.find({ ipAddress: clientIp }, function(err, items){
        if(err){
          console.log(err);
        }else{
          othercommodities(items, req, res);
        }
  })
});

router.get('/cart/successful', function(req, res){
  req.flash('success', 'Successful payment. Thank you for your patronage. We will reach out to you soon enough.');
  res.redirect('/');
})
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
      return res.redirect("/new");
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Succesfully logged out!!");
  res.redirect("/");
});
router.get("/new", isLoggedIn, function (req, res) {
  res.render("new");
});
router.post("/new/bag", isLoggedIn, upload.single("image"), function (req, res) {
  var obj = {
    name: req.body.name,
    img: {
      data: fs.readFileSync(
        path.join(__dirname, "../" + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
    price: req.body.price,
    description: req.body.description,
    purchaseUrl: req.body.purchaseUrl,
  };
  Images.create(obj, (err, bag) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/new');
    }
  });
})
router.post("/new/shoe", isLoggedIn, upload.single("image"), function (req, res) {
  var obj = {
    name: req.body.name,
    img: {
      data: fs.readFileSync(
        path.join(__dirname, "../" + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
    price: req.body.price,
    description: req.body.description,
  };
  Shoe.create(obj, (err, shoe) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/#Shoes');
    }
  });
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
router.put('/update-buyer', function(req, res){
  clientIp = requestIp.getClientIp(req);
  Buyer.updateOne({ ipAddress: clientIp }, req.body.stuff, function(err){
    if(err){
      console.log(err);
    }else{
      Buyer.find({ ipAddress: clientIp }, (err, updated) => console.log(updated))
      res.redirect('/cart#checkout-form');
    }
  })
})

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
//                 res.redirect("/new")
//             })
//         }
//     )
// })
