var departmentCollection = require('../models/schemas').departmentCollection;

var Departments = function () {};

Departments.prototype.addDep = function (deppartmentData, req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  console.log('dep', deppartmentData);
  console.log('data ' + deppartmentData);
  var deppartmentDoc = new departmentCollection({
    dep: deppartmentData.dep
  });
  deppartmentDoc.save(deppartmentDoc, function (error, document) {
    callback();
  });
};

Departments.prototype.getDep = function (req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  departmentCollection.find({}).exec(function (err, departments) {
    retObj.status = true;
    retObj.messages.push('Success');
    retObj.departments = departments;
    callback(retObj);
  });
};

Departments.prototype.getDepatNames = function (deptIds, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  // console.log('depiid', deptIds);
  departmentCollection.find({
      _id: {
        $in: deptIds
      }
    }, {
      dep: 1
    })
    .exec(function (err, dep) {
      retObj.status = true;
      retObj.messages.push('Success');
      retObj.departments = dep;
      callback(retObj);
    });
  // console.log('depiid', deptIds);
};

module.exports = new Departments();