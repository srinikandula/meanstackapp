var employeCollection = require('../models/schemas').employeCollection;
var departmentCollection = require('../models/schemas').departmentCollection;
<<<<<<< HEAD
var departmentApi = require('./departmentApi');
<<<<<<< HEAD
var _ = require('underscore');


=======
var async = require('async')
var _=require('underscore');
>>>>>>> commited
var Employees = function() {};
=======
// var departmentApi = require('./departmentApi');
var async = require('async');
var _ = require('underscore');
var Employees = function () {};
>>>>>>> commited

Employees.prototype.addEmploye = function (employeeData, req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  console.log('emp', employeeData);
  console.log('data ' + employeeData);
  var employeDoc = new employeCollection({
    name: employeeData.name,
    dep: employeeData.dep,
    id: employeeData.id,
    dob: employeeData.dob,
    doj: employeeData.doj,
    gender: employeeData.gender,
    mobileno: employeeData.mobileno,
    age: employeeData.age,
    salary: employeeData.salary,
    image: employeeData.image
  });
  employeDoc.save(employeDoc, function (error, document) {
    callback();
  });
};

<<<<<<< HEAD
Employees.prototype.getEmployees = function(req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  employeCollection.find({}).exec(function(err, employees) {
    var deptIds = _.uniq(employees, function(x) {
      return x.dep;
    });
    departmentApi.getDepatNames(deptIds, function(deptNames) {
      for (employee in employees) {
        for (dept in deptNames) {
          if (dept._id === employee.dep) {
              employee.deptName = dept.dep;
          }
        }
      }
      retObj.status = true;
      retObj.messages.push('Success');
      retObj.employees = employees;
      callback(retObj);
=======
// Employees.prototype.getEmployees = function(req, callback) {
//   var retObj = {
//     status: false,
//     messages: []
//   };
//   employeCollection.find({}).exec(function(err, employees) {
//     var deptIds = _.uniq(employees, function(x) {
//       return x.dep;
//     });
//     departmentApi.getDepatNames(deptIds, function(deptNames) {
//       for (employee in employees) {
//         for (dept in deptNames) {
//           if (dept._id === employee.dep) {
//               employee.deptName = dept.dep;
//           }
//         }
//       }
//       retObj.status = true;
//       retObj.messages.push('Success');
//       retObj.employees = employees;
//       callback(retObj);
//     });
//   });
// };

Employees.prototype.getEmployees = function (req, callback) {
<<<<<<< HEAD
    var retObj = {
        status: false,
        messages: []
    };
    employeCollection.find({}).exec(function (err, employees) {
        async.each(employees, function (employee, asyncCallback) {
            departmentCollection.findOne({
                _id: employee.dep
            }, function (err, dept) {
                console.log("===========",dept);
                if (err) {
                    asyncCallback(true);
                } else {
                    employee.dep = dept.Name;
                    console.log("employee....",employee.dep,dept.Name);
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
                retObj.data = employees;
                callback(retObj);
            }
        });

>>>>>>> commited
=======
  var retObj = {
    status: false,
    messages: []
  };
  employeCollection.find({}).exec(function (err, employees) {
    async.each(employees, function (employee, asyncCallback) {
      departmentCollection.findOne({
        _id: employee.dep
      }, function (err, dept) {
        console.log("===========", dept);
        if (err) {
          asyncCallback(true);
        } else {
          employee.dep = dept.Name;
          console.log("employee....", employee.dep, dept.Name);
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
        retObj.data = employees;
        callback(retObj);
      }
>>>>>>> commited
    });

  });
};

Employees.prototype.getEmployee = function (req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {
    _id: req.params._id
  };

  employeCollection.findOne(query, function (err, result) {
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

// ID Delete
Employees.prototype.deleteEmployees = function (id, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {
    _id: id
  };

  employeCollection.remove(query, function (err, result) {
    if (err) {
      retObj.status = false;
      retObj.messages.push('error while deleting' + JSON.stringify(err));
      callback(retObj);
    } else {
      retObj.status = true;
      retObj.messages.push('successfully deleted');
      retObj.data = result;
      callback(retObj);
    }
  });
};

// Name Delete
Employees.prototype.deleteNameEmployees = function (name, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {
    name: name
  };
  employeCollection.remove(query, function (err, result) {
    if (err) {
      retObj.status = false;
      retObj.messages.push('error while deleting' + JSON.stringify(err));
      callback(retObj);
    } else {
      retObj.status = true;
      retObj.messages.push('successfully deleted');
      retObj.data = result;
      callback(retObj);
    }
  });
};

Employees.prototype.updateEmp = function (employeData, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  employeCollection.findOneAndUpdate({
      _id: employeData._id
    }, {
      $set: employeData
    },
    function (err, result) {
      if (err) {
        retObj.status = false;
        retObj.messages.push('error in updating' + JSON.stringify(err));
        // callback(retObj);
      } else {
        retObj.status = true;
        retObj.messages.push('Successfully updated');
        retObj.data = result;
        callback(retObj);
      }
    }
  );
};

Employees.prototype.findOneEmployees = function (query, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  employeCollection.find({
    name: query.name
  }, function (err, employees) {
    retObj.status = true;
    retObj.messages.push('Success');
    retObj.employees = employees;
    callback(retObj);
  });
};

Employees.prototype.findEmployees = function (req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {};
  if (req.name != null) {
    query.name = {
      $regex: req.name,
      $options: 'i'
    };
  }
  if (req.age != null) {
    query.age = req.age;
  }
  console.log(query);
  employeCollection.find(query).exec(function (err, employees) {
    retObj.status = true;
    retObj.messages.push('Success');
    retObj.employees = employees;
    callback(retObj);
  });
};

Employees.prototype.sortEmployees = function (age, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {};
  console.log(query);
  employeCollection
    .find(query)
    .sort({
      age: -1
    })
    .exec(function (err, employees) {
      retObj.status = true;
      retObj.messages.push('Success');
      retObj.employees = employees;
      callback(retObj);
    });
};

// Employees.prototype.uploadEmployees = function() {};

module.exports = new Employees();