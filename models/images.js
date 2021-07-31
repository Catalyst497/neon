var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});
Image = mongoose.model("Image",imageSchema);
module.exports = Image;







