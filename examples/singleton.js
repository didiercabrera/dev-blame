function Bugs (){
	var self = this;
	this.bugs = [];
	
	this.addBug = function (name){
		self.bugs.push(name);
	}

	this.getBugs = function (){
		return self.bugs;
	}
}

module.exports = new Bugs();

