var mongoose = require('mongoose');

var Article = mongoose.model('Article', {
    title: String ,
    body: String ,
    authorId: String ,
    createTime: Date ,
    updateTime: Date
});

module.exports = Article;