var mongoose = require('mongoose');
var config = require('./../config/config');

console.log('Connecting to mongo using url - ' + config.mongo.url);
mongoose.connect(config.mongo.url);

var studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String,
  marks: Number
});

var employeSchema = new mongoose.Schema({
  name: String,
  password: String,
  // confirmpassword: String,
  dep: String,
  id: String,
  dob: Date,
  doj: Date,
  gender: String,
  mobileno: Number,
  age: Number,
  salary: String
  // image: String
});

var depSchema = new mongoose.Schema({
  dep: String
});

module.exports = {
  studentCollection: mongoose.model('student', studentSchema, 'student'),
  employeCollection: mongoose.model('employe', employeSchema, 'employe'),
  departmentCollection: mongoose.model('department', depSchema, 'department')
};