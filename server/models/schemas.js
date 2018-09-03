var mongoose = require('mongoose');
var config = require('./../config/config');

console.log('Connecting to mongo using url - ' + config.mongo.url);
mongoose.connect(config.mongo.url);

var studentSchema = new mongoose.Schema({
    name: String,
    class: String
});



module.exports = {
    studentCollection: mongoose.model('student', studentSchema, 'student')
};
