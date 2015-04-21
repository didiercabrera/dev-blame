var express = require('express');
var router = express.Router();


var DB = {
	users:{
		1:{
			name:didier,
			skills:[]
		}
	}

};

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
