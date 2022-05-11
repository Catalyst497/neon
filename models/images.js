var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
	id:{
		type: mongoose.Types.ObjectId,
		ref:"Image"
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
Image = mongoose.model("Image",imageSchema);
module.exports = Image;







