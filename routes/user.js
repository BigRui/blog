var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// register
router.get('/reg', function(req, res) {
    res.render("reg");
});
router.post('/reg', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var confirm = req.body.confirm;
    if(password === confirm) {
        res.send("success");
    } else {
        res.render("reg", {errors: {password: "password error!"}});
    }
});

module.exports = router;
