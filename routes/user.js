var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// register
router.get('/reg', function(req, res) {
    res.locals.errors = "";
    res.render("reg");
});
router.post('/reg', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var confirm = req.body.confirm;
    if(password === confirm) {
        res.send("success");
    } else {
        var errors = {password: "password error!"}
        res.locals.errors = errors;
        res.render("reg");
    }
});

module.exports = router;
