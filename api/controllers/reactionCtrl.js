var Reaction = require('../models/reaction');
var Slack = require('slack-node');

var webhookUri = "https://hooks.slack.com/services/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";

slack = new Slack();
slack.setWebhook(webhookUri);

module.exports = {
	create:function (req, res) {
		var imgsrc = req.param('imgsrc');
		var caption = req.param('caption');

		if(imgsrc && caption){
			Reaction.create(imgsrc,caption,function (err,doc) {
				if(err){
					res.status(500).end()
				}else{
					slack.webhook({
					  channel: "#la-plebe",
					  username: "dev_vs _ux",
					  text:caption + "\n https://dev-vs-ux.herokuapp.com/reaction/"+doc._id
					}, function(err, response) {

					});

					res.status(200).end()
				}
			});
		}
	},
	getAll:function (req, res) {
		var pagination = parseInt(req.param('pagination'));
		try{
			Reaction.getAll(pagination,function (err,docs) {
				res.json(docs);
			});
		}
		catch(err){

		}
	},
	getById:function (req, res) {
		var ID = req.param('id');
		Reaction.getOne(ID,function (err, reaction) {
			res.render('reaction',{
				title:reaction.caption,
				caption:reaction.caption,
				imgsrc:reaction.imgsrc,
				likes:reaction.likes,
				dislikes:reaction.dislikes
			});
		});
	},
	like:function (req,res){
		var id = req.param('id');
		Reaction.like(id,req.ip,function (err){
			if(err){
				res.status(503).end()
			}else{
				res.status(200).end()
			}
		});
	},
	disLike:function (req,res){
		var id = req.param('id');
		Reaction.dislike(id,req.ip,function (err){
			if(err){
				res.status(503).end()
			}else{
				res.status(200).end()
			}
		});
	}	
}