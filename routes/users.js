var express = require('express');
var router = express.Router();
var usersController =  require('../api/controllers/users');
console.log(usersController);
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:name', usersController.getOneuser )

module.exports = router;
