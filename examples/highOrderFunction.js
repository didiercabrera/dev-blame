
var greaterThan = function (n) {
	return function(m){

		return m > n;

	}
}

function execute ( fn ){
	
	return function ( arg ) {
		var val = fn(arg) 
		return val
	}

}

function unless (test, then){
	if (!test) then();
}


module.exports = {
	greaterThan:greaterThan,
	execute:execute,
	unless:unless
}