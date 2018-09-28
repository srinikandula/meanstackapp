var mongoose = require('mongoose');
var config = require('./../config/config');

console.log('Connecting to mongo using url - ' + config.mongo.url);
mongoose.connect(config.mongo.url);

// var userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true
//   },
//   password: {
//     type: String
//   },
//   firstname: String,
//   lastname: String
// })

var studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String,
  marks: Number
});

var employeSchema = new mongoose.Schema({
  // name: String,
  username: String,
  password: String,
  co_password: String,
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

var tripSchema = new mongoose.Schema({
  vehicleNumber: String,
  driverName: String,
  driverNumber: Number,
  fileUpload: String,
  from: String,
  to: [{
    name: String
  }],
  freightAmount: Number,
  paidAmount: Number
})

module.exports = {
  // userCollection: mongoose.model('user', userSchema, 'user'),
  studentCollection: mongoose.model('student', studentSchema, 'student'),
  employeCollection: mongoose.model('employe', employeSchema, 'employe'),
  departmentCollection: mongoose.model('department', depSchema, 'department'),
  tripCollection: mongoose.model('trip', tripSchema, 'trip'),
};