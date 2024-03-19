var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers')

/* GET home page. */
router.post('/check', indexControllers.checkLocation);

router.post('/', indexControllers.startGame)

router.put('/', indexControllers.endGame)

router.put('/username', indexControllers.updateUsername)

module.exports = router;
