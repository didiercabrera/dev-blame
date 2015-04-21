var express = require('express');
var router = express.Router();

module.exports = {
	getAllUsers:function (req, res){
		res.json({users:[]});
	},
	getOneuser:function (req, res){
		res.json({
			name:req.params.name
		});
	}
}