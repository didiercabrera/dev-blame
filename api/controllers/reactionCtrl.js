var Reaction = require('../models/reaction');
var https = require('https');

module.exports = {
	create:function (req, res) {
		var imgsrc = req.param('imgsrc');
		var caption = req.param('caption');

		if(imgsrc && caption){
			Reaction.create(imgsrc,caption,function (err) {
				if(err){
					res.status(500).end()
				}else{

					// https.request({
					// 	host:'https://hooks.slack.com/services/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',
					// 	methos:'POST'
					// },function (res){
						
					// });


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
			res.render('reaction',{
				title:reaction.caption,
				caption:reaction.caption,
				imgsrc:reaction.imgsrc
			});
		});
	}
}