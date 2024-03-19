var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers')

/* GET home page. */
router.post('/check', indexControllers.checkLocation);

router.post('/', indexControllers.startGame)

module.exports = router;
