var mongoose = require('mongoose');
var cartSchema = new mongoose.Schema({
    id: {
      	type: mongoose.Types.ObjectId,
		ref:"Cart"  
    },
	name: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    quantity: Number,
    ipAddress: String,
    price: Number,
    description: String,
});
Cart = mongoose.model("cart",cartSchema);
module.exports = Cart;