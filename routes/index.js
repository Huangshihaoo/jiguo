var express = require('express');
var router = express.Router();
let path = require('path');

const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname,'../index.html'));
});

router.get('/getlist', function (req, res, next) {
    let data = fs.readFileSync(path.join(__dirname, '../data', 'json4.js'));
    data = data.toString();
    res.send(data);
});

router.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../public','404.html'));
  });

module.exports = router;
