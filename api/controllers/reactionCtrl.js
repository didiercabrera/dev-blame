var Reaction = require('../models/reaction');

module.exports = {
	create:function (req, res) {
		var imgsrc = req.param('imgsrc');
		var caption = req.param('caption');

		if(imgsrc && caption){
			Reaction.create(imgsrc,caption,function (err) {
				if(err){
					res.status(500).end()
				}else{
					res.status(200).end()
				}
			});
		}
	},
	getAll:function (req, res) {
		Reaction.getAll(function (err,docs) {
			res.json(docs);
		});
	},
	getById:function (req, res) {
		var ID = req.param('id');
		Reaction.getOne(ID,function (err, reaction) {
			res.json(reaction);
		});
	}
}