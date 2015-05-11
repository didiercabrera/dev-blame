var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var reactionsCtrl = require('../api/controllers/reactionCtrl');
router.get('/reaction/:id',reactionsCtrl.getById)
router.get('/reactions/:pagination',reactionsCtrl.getAll);
router.post('/reactions/dislike',reactionsCtrl.disLike);
router.post('/reactions/like',reactionsCtrl.like);

router.post('/reactions',reactionsCtrl.create);
module.exports = router;
