var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

exports.Article = require("./Article");
exports.User = require("./User");