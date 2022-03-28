const mongoose = require('mongoose');
const Image = require("./images");
const buyerSchema = new mongoose.Schema({
    ipAddress: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    ]
});
module.exports = mongoose.model('Buyer', buyerSchema);
