var express = require('express');
var router = express.Router();
var validator = require("validator");
var uid = require("shortid");

var User = require("../model/User.js");

//global.users = [];

/* GET users listing. */
router.get('/', function(req, res) {
//  res.send('respond with a resource');
    res.render("index", {user: req.session.user || {}});
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
//        var id = uid();
//        var user = {
//            id: id,
//            username: username,
//            password: password
//        }
//        global.users.push(user);
//        res.send("reg success");
        var user = new User({username: username, password: password});
        user.save();
        res.redirect("/user/list");
    }
});

router.get("/list", function(req, res) {
//    res.render("list", {users: global.users});
    User.find({}, function(err, result) {
//        console.log(result);
//        res.send();
        res.render("list", {users: result});
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

//登录功能
router.post("/login", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

//    // 临时验证 (注:forEach不能break跳出循环)
//    var pass = false;
//    global.users.forEach(function(user) {
//        if(username === user.username && password === user.password) {
//            pass = true;
//        }
//    });
//
//    if(pass) {
//        res.send("login success!");
//        // session
//    } else {
////        res.send("login false!");
//        res.render("login", {error: true});
//    }

    User.findOne({username: username, password: password}, function(err, user) {
        if(user) {
//            res.send("login success!");
            req.session.user = user;
            res.redirect("/user");
        } else {
            res.render("login", {error: true});
        }
    });
});

// 更改密码
router.get("/uppwd", function(req, res) {
    if(req.session.user) {
        res.render("uppwd", {user: req.session.user, errors: {}});
    } else {
        res.render("login");
    }
});

router.post("/uppwd", function (req, res) {
    if(req.session.user) {
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;
        var confirm = req.body.confirm;

        if(req.session.user.password === oldPassword) {

            var errors = {};

            if(!validator.isLength(newPassword, 5, 18) ) {
                errors.newPassword = "password string >5 <10";
            }
            if(newPassword !== confirm) {
                errors.confirm = "confirm password must === password";
            }

            if(Object.keys(errors).length  > 0) {
                res.render("uppwd", {user: req.session.user, errors: errors});
            } else {
                User.findOne({username: req.session.user.username}, function (err, user) {
                    user.password = newPassword;
                    user.save();
                    res.redirect("/user");
                });
            }
        } else {
            var errors = {};
            errors.oldPassword = "旧密码错误";
            res.render("uppwd", {user: req.session.user, errors: errors});
        }
    } else {
        res.render("login");
    }
});

module.exports = router;
