var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var reactionsCtrl = require('../api/controllers/reactionCtrl');
router.get('/reaction/:id',reactionsCtrl.getById)
router.get('/reactions',reactionsCtrl.getAll);

router.post('/reactions',reactionsCtrl.create);
module.exports = router;
