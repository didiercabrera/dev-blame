var mongoose=require('mongoose');

var IMG_schema = new mongoose.Schema({
	imgsrc:{type:String},
	caption:{type:String},
	created_at:{type:Date, default:Date.now}
});

var Img = mongoose.model('Img',IMG_schema);


module.exports = {
	create:function (imgsrc, caption, callback) {
		console.log(imgsrc,caption);
		var new_img = new Img({
			imgsrc:imgsrc,
			caption:caption
		});
		new_img.save(callback);		
	},
	getOne:function (id,callback) {
		Img.findOne({"_id":id},{},callback);
	},
	getAll:function (callback) {
		Img.find({},{},callback);
	}
}