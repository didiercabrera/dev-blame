var express = require('express');
var router = express.Router();
var usersController =  require('../api/controllers/users');
console.log(usersController);
/* GET users listing. */

router.get('/', usersController.getAllUsers );

router.get('/:name', usersController.getUser )
router.post('/:name', usersController.postUser )

module.exports = router;
