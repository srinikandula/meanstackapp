var tripCollection = require('../models/schemas').tripCollection;
var fse = require('fs-extra');
var async = require('async');



var Tripes = function () {};

function addTrip(tripData,fileNames,callback){
    var retObj = {
        status:false,
        messages:[]
    };
    if(fileNames.length>0){
        for (var i = 0; i < fileNames.length; i++) {
            tripData.documents.push(fileNames[i]);
        }
    }
    tripCollection.count({}, function (err, count) {
        if (count >= 1) {
            tripCollection.find().sort({serialNo: -1}).limit(1).exec(function (err, result) {
                if (result) {
                    tripData.serialNo = result[0].serialNo + 1;
                    var tripDoc = new tripCollection(tripData);
                    tripDoc.save(function (err, result) {
                        if (err) {
                            retObj.status = false;
                            retObj.messages.push("Error while saving trip" + JSON.stringify(err));
                            callback(retObj);
                        } else {
                            retObj.status = true;
                            retObj.messages.push("Success");
                            callback(retObj);
                        }
                    });
                }
            })
        } else {
            tripData.serialNo = 100000;
            var tripDoc = new tripCollection(tripData);
            tripDoc.save(function (err, result) {
                if (err) {
                    retObj.status = false;
                    retObj.messages.push("Error while saving trip" + JSON.stringify(err));
                    callback(retObj);
                } else {
                    retObj.status = true;
                    retObj.messages.push("Success");
                    callback(retObj);
                }
            });
        }
    });
};


function saveFile(files, callback) {
    var retObj = {
        status: true,
        messages: [],
        fileNames: []
    };
    async.map(files, function (doc, fileCallback) {
        var file = doc.file;
        var fileName = new Date() - 0 + "_" + file.originalFilename;

        fse.copy(file.path, './client/documents/trips/' + fileName, function (err) {
            if (err) {
                retObj.status = false;
                retObj.messages.push('Document uploading failed');
                callback(retObj);
            } else {
                fse.remove(file.path, function (err) {
                    if (err) {
                        retObj.status = false;
                        retObj.messages.push('Document uploading failed');
                        fileCallback(true);
                    } else {
                        retObj.fileNames.push(fileName);
                        fileCallback(false);
                    }

                });

            }
        })
    }, function (err) {
        if (err) {
            retObj.status = false;
            retObj.message.push("Document uploading failed");
            callback(retObj);
        } else {
            retObj.status = true;
            retObj.messages.push('Documents Added Successfully');
            callback(retObj);
        }
    });
};

Tripes.prototype.addTrip = function (tripData, files, req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    tripData.documents = [];
    if(files !== undefined) {
        saveFile(files, function (saveFileCallback) {
            if (!saveFileCallback.status) {
                retObj.status = false;
                retObj.messages.push("Error while saving trip" + JSON.stringify(err));
                callback(retObj);
            } else {
                addTrip(tripData,saveFileCallback.fileNames,function (addCallback) {
                    callback(addCallback);
                });
            }
        });
    }else{
        addTrip(tripData,[],function (addCallback) {
            callback(addCallback);
        });
    }

};


Tripes.prototype.getTripes = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    tripCollection.find({}).exec(function (err, tripes) {
        if(err){
            retObj.status = false;
            retObj.messages.push("error while fetching the data"+JSON.stringify(err));
            callback(retObj);
        }else{
            retObj.status = true;
            retObj.messages.push('Success');
            retObj.tripes = tripes;
            callback(retObj);
        }
    });
};

function updateTrip(tripData,callback){
    var retObj = {
        status:false,
        messages:[]
    };;
    console.log("tripDataaaaaaaaaaaaaaaaaaaaaaaaaaaaa255555555555",tripData)
    if(tripData.dispatchDate===null){
        console.log("dispatchDate",dispatchDate)
        tripData.dispatchDate=''
    }else if(tripData.driverNumber===null){
        tripData.driverNumber=''
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    }else if(tripData.partyPhoneNumber===null){
        tripData.partyPhoneNumber=''
        console.log("partyPhoneNumber",tripData.partyPhoneNumber);
    }else if(tripData.quantity===null){
        tripData.quantity=''
        console.log("quantity",tripData.quantity)
    }else if(tripData.freightPerMt==null){
        tripData.freightPerMt=''
        console.log("freightPerMt",tripData.freightPerMt)
    }else if(tripData.unloadingCharges==null){
        tripData.unloadingCharges=''
        console.log("unloadingCharges",tripData.unloadingCharges)
    }else if(tripData.totalAmountPaid==null){
        tripData.totalAmountPaid=''
        console.log("totalAmountPaid",tripData.totalAmountPaid)
    }else if(tripData.invoiceAmount==null){
        tripData.invoiceAmount=''
        console.log("invoiceAmount",tripData.invoiceAmount)
    }else if(tripData.profitOrLoss==null){
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiprofitOrLoss");
        console.log("profitOrLoss",tripData.profitOrLoss)
        tripData.profitOrLoss=0
    }else if(tripData.profitOrLoss==null){
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiprofitOrLoss222222222222");
        tripData.profitOrLoss=0
    }
    tripData.profitOrLoss=0;

    tripCollection.findOneAndUpdate({_id:tripData._id},{$set:tripData},function(err,result){
        if(err){
            retObj.status = false;
            retObj.messages.push("error while updating the data"+JSON.stringify(err));
            console.log("errrrrrrrrrrrrrrrrr",err);
            callback(retObj);
        }else{
            retObj.status = true;
            retObj.messages.push("success");
            callback(retObj);
        }
    });
};

Tripes.prototype.updateTrip = function (tripData,files,callback) {
    var retObj = {
        status: false,
        messages: []
    };
    if(files !== undefined) {
        saveFile(files, function (saveFileCallback) {
            if (!saveFileCallback.status) {
                retObj.status = false;
                retObj.messages.push("Error while saving trip" + JSON.stringify(err));
                callback(retObj);
            } else {
                if (!tripData.documents) {
                    tripData.documents = []
                }
                tripData.documents = tripData.documents.concat(saveFileCallback.fileNames);
                updateTrip(tripData,function (updateCallback) {
                    callback(updateCallback);
                });
            }
        });
    }else{
        updateTrip(tripData,function (updateCallback) {
            callback(updateCallback);
        });
    }
};

Tripes.prototype.getOneTrip = function (tripid, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query={_id:tripid}
    tripCollection.findOne(query,function (err, result) {
            if (err) {
                retObj.status = false;
                retObj.messages.push('error in updating' + JSON.stringify(err));
                callback(retObj);
            } else {
                retObj.status = true;
                retObj.messages.push('Success');
                retObj.data = result;
                callback(retObj);
            }
        }
    );
};

Tripes.prototype.deleteTripes = function (id, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query = {_id: id};
    tripCollection.remove(query, function (err, result) {
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

Tripes.prototype.removeDoc = function(queryParams,callback){
    var retObj = {
        status:false,
        messages:[]
    };
    fse.remove('./client/documents/trips/' + queryParams.file, function (err) {
        if (err) {
            retObj.status = false;
            retObj.messages.push('Document removing failed');
            callback(retObj);
        } else {
            tripCollection.update(
                {_id: queryParams._id},
                {$pull: {documents: queryParams.file}},
                {safe: true}, function (err, doc) {
                    if(err){
                        retObj.status = false;
                        retObj.messages.push('Document removing failed');
                        callback(retObj);
                    }else{
                        retObj.status = true;
                        retObj.messages.push('Document Removed Successfully');
                        callback(retObj);
                    }
                });
        }
    });
};

module.exports = new Tripes();
