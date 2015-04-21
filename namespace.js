/*
	This exports a namespace containing several objects and 
	properties
*/

module.exports = {
	options:{
		version:'6.6.6'
	},
	test:function ( msg ) {
		console.log(msg);
	},
	returnSomething:function ( name ){
		return {
			name:name
		}
	},
	wtf:require('express')
}