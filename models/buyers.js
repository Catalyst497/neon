const mongoose = require('mongoose');
const Image = require("./images");
const buyerSchema = new mongoose.Schema({
    ipAddress: String,
    name: String,
    email: String,
    phoneNumber: Number
});
module.exports = mongoose.model('Buyer', buyerSchema);


    // cart: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Image'
    //     }
    // ]