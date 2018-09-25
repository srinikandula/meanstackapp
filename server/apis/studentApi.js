// var studentCollection = require('./../models/schemas').studentCollection;

// var Students = function() {};

// Students.prototype.addStudent = function(studentData, req, callback) {
//   var retObj = {
//     status: false,
//     messages: []
//   };

//   var studentDoc = new studentCollection({
//     name: studentData.name,
//     class: studentData.class
//   });
//   studentDoc.save(studentDoc, function(error, document) {
//     callback();
//   });
// };

// Students.prototype.getStudents = function(req, callback) {
//   var retObj = {
//     status: false,
//     messages: []
//   };
//   var query = {};
//   if (req.query.keyWord != null) {
//     query.name = { $regex: req.query.firstName, $options: 'i' };
//   }

//   if (req.query.class != null) {
//     query.class = req.query.class;
//   }
//   console.log(query);
//   studentCollection.find(query).exec(function(err, students) {
//     retObj.status = true;
//     retObj.messages.push('Success');
//     retObj.students = students;
//     callback(retObj);
//   });
// };

// module.exports = new Students();

var studentCollection = require('./../models/schemas').studentCollection;
var departmentCollection = require('../models/schemas').departmentCollection;
var async = require('async');
var _ = require('underscore');

var Students = function () {};

Students.prototype.addStudent = function (studentData, req, callback) {
  var retObj = {
    status: false,
    messages: []
  };

  var studentDoc = new studentCollection({
    name: studentData.name,
    dep: studentData.dep,
    id: studentData.id,
    dob: studentData.dob,
    doj: studentData.doj,
    gender: studentData.gender,
    mobileno: studentData.mobileno,
    age: studentData.age,
    class: studentData.class
  });
  studentDoc.save(studentDoc, function (error, document) {
    callback();
  });
};

// Students.prototype.getStudents = function (req, callback) {
//   var retObj = {
//     status: false,
//     messages: []
//   };
//   var query = {};
//   if (req.query.keyWord != null) {
//     query.name = {
//       $regex: req.query.firstName,
//       $options: 'i'
//     };
//   }

//   if (req.query.class != null) {
//     query.class = req.query.class;
//   }
//   console.log(query);
//   studentCollection.find(query).exec(function (err, students) {
//     retObj.status = true;
//     retObj.messages.push('Success');
//     retObj.students = students;
//     callback(retObj);
//   });
// };

Students.prototype.getStudent = function (req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {
    _id: req.params._id
  };

  studentCollection.findOne(query, function (err, result) {
    if (err) {
      retObj.status = false;
      retObj.messages.push('error while finding' + JSON.stringify(err));
      callback(retObj);
    } else {
      retObj.status = true;
      retObj.messages.push('successfully');
      retObj.data = result;
      callback(retObj);
    }
  });
};


Students.prototype.getStudents = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    studentCollection.find({}).exec(function (err, students) {
        async.each(students, function (student, asyncCallback) {
            departmentCollection.findOne({
                _id: student.dep
            }, function (err, dept) {
                console.log("===========",dept.Name);
                if (err) {
                    asyncCallback(true);
                } else {
                    student.dep = dept.Name;
                    console.log("student....",student.dep,dept.Name);
                    asyncCallback(false);
                }
            });
        }, function (err) {
            if (err) {
                retObj.status = false;
                retObj.messages.push('error while finding' + JSON.stringify(err));
                callback(retObj);
            } else {
                retObj.status = true;
                retObj.messages.push('successfully');
                retObj.data = students;
                callback(retObj);
            }
        });

    });
};

Students.prototype.deleteStudent = function (id, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {
    _id: id
  };
  studentCollection.remove(query, function (err, result) {
    if (err) {
      retObj.status = false;
      retObj.messages.push('error while deleting' + JSON.stringify(err));
      callback(retObj);
    } else {
      retObj.status = true;
      retObj.messages.push('successfully deleted.................');
      retObj.data = result;
      callback(retObj);
    }
  });
};
Students.prototype.updateStudents = function (id, studentData, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  studentCollection.findOneAndUpdate({
      _id: studentData._id
    }, {
      $set: studentData
    },
    function (err, result) {
      console.log('studetdata', studentData);
      if (err) {
        retObj.status = false;
        retObj.messages.push('error in updating' + JSON.stringify(err));
        callback(retObj);
      } else {
        retObj.status = true;
        retObj.messages.push('Successfully updated............');
        retObj.data = result;
        callback(retObj);
      }
    }
  );
};
Students.prototype.sortStudents = function (param, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {};
  console.log(query);

  studentCollection
    .find(query)
    .sort({
      marks: -1
    })
    .exec(function (err, students) {
      retObj.status = true;
      retObj.messages.push('Success');
      retObj.students = students;
      callback(retObj);
    });
};

module.exports = new Students();