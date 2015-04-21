var DB = require('../tools').DB;

module.exports = {
	create: function (name, email, bio) {
		DB.users.push({
			name:name,
			email:email,
			bio:bio
		});
	},
	getAll:function (){
		var users = DB.users;
		return {
			users:users
		};
	},
	getByName:function (name){
		var users = DB.users;
		var user_found = {};
		for( var i in users){
			if(users[i].name === name){
				user_found = users[i];
			}
		}

		return user_found;
	}
}