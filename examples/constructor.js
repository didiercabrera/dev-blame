function Person (name) {
	this.name = name;
}

Person.prototype.saludar = function() {
	console.log('Hola');
};

Person.prototype.method_name = function(first_argument) {
	// body...
};

module.exports = Person;