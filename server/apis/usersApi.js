var AccountsCollection = require('./../models/schemas').AccountsCollection;

var Users = function () {};

Users.prototype.addUser = function (signupData, req, callback) {
    var retObj = {
        status: false,
        messages: []
    };

    var signupDoc = new AccountsCollection(signupData);
    signupDoc.save(signupDoc, function (error, document) {
        if (error) {
            retObj.status = false;
            retObj.messages.push("Error in loging the user", JSON.stringify(err));
            callback(retObj);
        } else {
            retObj.messages.push("Success");
            callback(retObj);
        }
    });
};
Users.prototype.getUser = function (req, callback) {
  var retObj = {
    status: false,
    messages: []
  };
  var query = {};
  if (req.query.keyWord != null) {
    query.name = {
      $regex: req.query.firstName,
      $options: 'i'
    };
  }

  if (req.query.class != null) {
    query.class = req.query.class;
  }
  AccountsCollection.find(query).exec(function (err, users) {
    retObj.status = true;
    retObj.messages.push('Success');
    retObj.users = users;
    callback(retObj);
  });
};


module.exports = new Users();