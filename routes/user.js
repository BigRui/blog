var express = require('express');
var router = express.Router();
var validator = require("validator");

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
    var errors = {};

    var username = req.body.username;
    var password = req.body.password;
    var confirm = req.body.confirm;

//    console.log(validator.isLength(username, 5, 18));
    if(!validator.isLength(username, 5, 18)) {
        errors.username = "username string >5 <10";
    }
    if(!validator.isLength(password, 5, 18) ) {
        errors.password = "password string >5 <10";
    }
    if(password !== confirm) {
        errors.confirm = "confirm password must === password";
    }

    if(Object.keys(errors).length  > 0) {
        res.render("reg", {errors: errors});
    } else {
        res.send("reg success");
    }
});

module.exports = router;
