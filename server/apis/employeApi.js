var employeCollection = require('../models/schemas').employeCollection;
var departmentCollection = require('../models/schemas').departmentCollection;
var departmentApi = require('./departmentApi');
var async = require('async');
var _ = require('underscore');

var Employees = function () {};

Employees.prototype.addEmploye = function (employeeData, req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  console.log('emp', employeeData);
  console.log('data ' + employeeData);
  var employeDoc = new employeCollection({
    username: employeeData.username,
    password: employeeData.password,
    co_password: employeeData.co_password,
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

Employees.prototype.getEmployees = function (req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  employeCollection.find({}).exec(function (err, employees) {
    async.each(
      employees,
      function (employee, asyncCallback) {
        departmentCollection.findOne({
            _id: employee.dep
          },
          function (err, dept) {
            if (err) {
              asyncCallback(true);
            } else {
              employee.dep = dept.dep;
              asyncCallback(false);
            }
            // console.log(employee.dep);
          }
        );
      },
      function (err) {
        if (err) {
          retObj.status = false;
          retObj.messages.push('error while finding' + JSON.stringify(err));
          callback(retObj);
        } else {
          retObj.status = true;
          retObj.messages.push('successfully');
          retObj.data = employees;
          // console.log('emp', employees);
          callback(retObj);
        }
      }
    );
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
    },
    function (err, employees) {
      retObj.status = true;
      retObj.messages.push('Success');
      retObj.employees = employees;
      callback(retObj);
    }
  );
};

Employees.prototype.findCheckName = function (req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  console.log('hitAPI', req.body);
  // console.log('hitAPI');
  var query = {
    username: req.body.username,
    // id: req.body.userId
  };
  console.log('flnvfnb', query);
  employeCollection.find(query, function (err, user) {
    if (err) {
      console.log('Username exist');
      callback(retObj);
    }
    console.log('data', user);
    if (user.length != 0) {
      if (user[0].username) {
        console.log('Username already exists, username: ' + user);
        retObj.status = true;
        callback(retObj);
      }
    } else {
      retObj.status = false;
      retObj.messages.push("Username not exists");
      console.log('data1', user);
      callback(retObj);
    }
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