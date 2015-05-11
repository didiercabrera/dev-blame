var mongoose=require('mongoose');

var IMG_schema = new mongoose.Schema({
	imgsrc:{type:String},
	caption:{type:String},
	created_at:{type:Date, default:Date.now},
	likes:{type:Number},
	dislikes:{type:Number},
	ips:[]
});

var Img = mongoose.model('Img',IMG_schema);


module.exports = {
	create:function (imgsrc, caption, callback) {
		var new_img = new Img({
			imgsrc:imgsrc,
			caption:caption
		});
		new_img.save(callback);		
	},
	getOne:function (id,callback) {
		Img.findOne({"_id":id},{},callback);
	},
	getAll:function (pagination,callback) {
		if(pagination){
			Img.find({},{},callback)
		}else{
			Img.find({},{},callback);
		}
	},
	like:function (id,ip,callback){
		Img.findById(id,function (error,img){
			if(error || !img){
				callback(true);
				return;
			}			

			if(img.ips.indexOf(ip)!==-1){
				callback(true);
				return;
			}
			img.ips.push(ip);
			var img_likes = img.likes || 0;
			img.likes = img_likes + 1;
			img.save(callback)
		});
	},
	dislike:function (id,ip,callback){
		Img.findById(id,function (error,img){
			if(error || !img){
				callback(true);
				return;
			}
			if(img.ips.indexOf(ip)!==-1){
				callback(true);
				return;
			}
			img.ips.push(ip);			
			var img_dislikes = img.dislikes || 0;
			img.dislikes = img_dislikes + 1;
			img.save(callback)
		});
	}
}