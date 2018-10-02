var AccountsCollection = require('./../models/schemas').AccountsCollection;

var signup = function () {};

signup.prototype.addUser = function (signupData, req, callback) {
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
signup.prototype.getUser = function (req, callback) {
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
  console.log(query);
  AccountsCollection.find(query).exec(function (err, users) {
    retObj.status = true;
    retObj.messages.push('Success');
    retObj.users = users;
    callback(retObj);
  });
};
signup.prototype.findCheckName = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    console.log('hitAPI', req.body);
    // console.log('hitAPI');
    var query = {
        username: req.body.userName,
        // id: req.body.userId
    };
    console.log('flnvfnb', query);
    AccountsCollection.find(query, function (err, user) {
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

module.exports = new signup();