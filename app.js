var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const URL = "mongodb+srv://Catalyst:Dan@12345678@neon.zfvqp.mongodb.net/Neon?retryWrites=true&w=majority";
mongoose.connect(URL ,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Routes
app.get("/", function (req,res){
    res.render("Home Page" );
});
app.get("/gallery", function(req,res){
	res.render("Gallery");
})
app.get("/login", function(req,res){
	res.render("login");
})
app.post("/login", function(req,res){

})
app.listen("400" || process.env.port, function(){
    console.log("You are welcome to naija")
});
