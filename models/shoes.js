var mongoose = require('mongoose');
var shoeSchema = new mongoose.Schema({
	id:{
		type: mongoose.Types.ObjectId,
		ref:"Shoe"
	},
	name: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    ipAddress: String,
    price: Number,
    description: String,
});
Shoe = mongoose.model("Shoe", shoeSchema);
module.exports = Shoe;

