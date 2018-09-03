
var studentCollection = require('./../models/schemas').studentCollection;

var Students = function () {
};

Students.prototype.addStudent = function (studentData, req, callback) {
    var retObj = {
        status: false,
        messages: []
    };

    var studentDoc = new studentCollection({
        name:studentData.name,
        class: studentData.class
    });
    studentDoc.save(studentDoc, function(error, document){
        callback();
    });
};

Students.prototype.getStudents = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query = {};
    if(req.query.keyWord != null){
        query.name = {'$regex' : req.query.firstName, '$options' : 'i' };
    }

    if(req.query.class != null) {
        query.class= req.query.class;
    }
    console.log(query);
    studentCollection
                .find(query)
                .exec(function (err, students) {
            retObj.status = true;
            retObj.messages.push('Success');
            retObj.students  = students;
            callback(retObj);
    });
};


module.exports = new Students();