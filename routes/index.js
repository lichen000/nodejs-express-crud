const express = require('express');
const router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
    res.send("welcome to nodejs");
});

module.exports = router;