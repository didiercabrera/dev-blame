var highOrderFunctions = require('./highOrderFunction');

var unless = highOrderFunctions.unless;

function repeat(times, fn){
	for(var i =0; i<times;i++){
		fn(i);
	}
}

repeat(20, function(n){
  var error =  (n % 2);

  unless(error, function(){
      console.log(n, 'es par');
  });
})

