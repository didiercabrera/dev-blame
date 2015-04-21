var usersModel = require('../models/users');

module.exports = {
	getAllUsers:function (req, res){
		res.json( usersModel.getAll() );
	},
	getUser:function (req, res){
		var user_name = req.params.name;
		var user_found = usersModel.getByName(user_name);
		res.json(user_found);
	},
	postUser:function (req, res){
		var name = req.params.name;
		var email = req.params.name;

		usersModel.create(name,email,bio);
	}
}