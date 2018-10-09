app.factory('tripService', ['$http', '$cookies', function ($http, $cookies) {
    return {
        getAllTripes: function (success, error) {
            $http({
                url: '/v1/tripes/getAllTripes',
                method: "GET"
            }).then(success, error)
        },
        getOne: function (_id, success, error) {
            $http({
                url: 'v1/tripes/getOne/' + _id,
                method: "GET"
            }).then(success, error)
        }, tripDelete: function (_id, success, error) {
            $http({
                url: 'v1/tripes/removeTrip/' + _id,
                method: "DELETE"
            }).then(success, error)
        },
        removeDoc: function (params, success, error) {
            $http({
                url: 'v1/tripes/removeDoc',
                method: "DELETE",
                params: params
            }).then(success, error)
        }
    }
}]);


app.controller("TripsController", ['tripService', '$scope', '$http', '$state', '$stateParams', 'Upload', 'Notification', function (tripService, $scope, $http, $state, $stateParams, Upload, Notification) {
    $scope.tripes = [];
    $scope.choices = [''];
    $scope.fileUploads = [];
    $scope.tripData = {
        date: '',
        truckNumber: '',
        dispatchDate: '',
        driverNumber: '',
        lrNumber: '',
        destination: '',
        partyName: '',
        partyPhoneNumber: '',
        unloadingDate: '',
        files: [{}],
        quantity: '',
        freightPerMt: 0,
        unloadingCharges: 0,
        totalAmountPaid: 0,
        invoiceAmount: 0,
        profitOrLoss: 0,
        serialNo: '',
        unloadingPoints: [{
            index: 0,
            name: ''
        }]
    };

    $scope.goToTrips = function () {
        $state.go('tripsList');
    }

    $scope.addNewChoice = function () {
        var length = $scope.tripData.unloadingPoints.length;
        if (!$scope.tripData.unloadingPoints[length - 1].name) {
            // $scope.party.error.push("Please Enter To Field");
            $scope.unloadingPointsmsg = true;

        }
        else {
            $scope.unloadingPointsmsg = false;
            $scope.tripData.unloadingPoints.push({
                index: length
            });

        }
    };
    $scope.addtrip = function () {
        $state.go('addTrip');
    }

    $scope.deleteToCitys = function (index) {
        if ($scope.tripData.unloadingPoints.length > 1) {
            $scope.tripData.unloadingPoints.splice(index, 1);
        } else {
            Notification.error("Please add at least one Additional Charge");
        }
    }


    $scope.TripFormSubmit = function () {
        // console.log("tripData",$scope.tripData);
        if (!$stateParams.id) {
            var files = $scope.tripData.files;
            Upload.upload({
                url: '/v1/tripes/addTrip',
                data: {
                    files: files,
                    content: $scope.tripData
                }
            }).then(function (success) {
                if (success.data.status) {
                    $state.go('tripsList');
                    $scope.getAll();
                    Notification.success("Trip added successfully");
                } else {
                    success.data.messages.forEach(function (message) {
                        Notification.error(message);
                    });
                }
            });
        } else {
            var files = $scope.tripData.files;
            Upload.upload({
                url: '/v1/tripes/updateTrip',
                data: {
                    files: files,
                    content: $scope.tripData
                }
            }).then(function (success) {
                if (success.data.status) {
                    $state.go('tripsList');
                    $scope.getAll();
                    Notification.success("Trip updated successfully");
                } else {
                    success.data.messages.forEach(function (message) {
                        Notification.error(message);
                    });
                }

            });
        }
    };

    $scope.getAll = function () {
        tripService.getAllTripes(function (response) {
                $scope.tripes = response.data.tripes;
            },
            function (error) {
                Notification.error(error);
            })
    }

    $scope.getAll();

    if ($stateParams.id) {
        console.log("$stateParams.id", $stateParams.id);
        tripService.getOne($stateParams.id, function (success) {
            if (success.data.status) {
                $scope.tripData = success.data.data;
                if ($scope.tripData.date !== undefined) {
                    $scope.tripData.date = new Date($scope.tripData.date);
                }
                if ($scope.tripData.dispatchDate !== undefined) {
                    $scope.tripData.dispatchDate = new Date($scope.tripData.dispatchDate);
                }
                if ($scope.tripData.unloadingDate !== undefined) {
                    $scope.tripData.unloadingDate = new Date($scope.tripData.unloadingDate);
                }
            } else {
                success.data.messages.forEach(function (message) {
                    Notification.error(message);
                });
            }
            $scope.tripData.files = [{}];
        }, function (error) {
        })
    } else {
        $scope.tripData = {
            date: '',
            truckNumber: '',
            dispatchDate: '',
            driverNumber: '',
            lrNumber: '',
            destination: '',
            partyName: '',
            partyPhoneNumber: '',
            unloadingDate: '',
            files: [{}],
            quantity: 0,
            freightPerMt: 0,
            unloadingCharges: 0,
            totalAmountPaid: 0,
            invoiceAmount: 0,
            profitOrLoss: 0,
            serialNo: '',
            unloadingPoints: [{
                index: 0,
                name: ''
            }]
        };

    }
    $scope.tripRemove = function (_id) {
        tripService.tripDelete(_id, function (response) {
            console.log(response);
            if (response.data.status) {
                $scope.getAll();
            }
        }, function (err) {
            Notification.error(err);
        })
    };

    $scope.addDoc = function () {
        if ($scope.tripData.files[$scope.tripData.files.length - 1].file) {
            $scope.tripData.files.push({});
        } else {
            Notification.error("Please select file");
        }
    };
    $scope.removeDoc = function (doc, index) {
        var params = {
            _id: $scope.tripData._id,
            file: doc
        };
        tripService.removeDoc(params, function (successCallback) {
            if (successCallback.data.status) {
                $scope.tripData.documents.splice(index, 1);
            } else {
                successCallback.data.messages.forEach(function (message) {
                    Notification.error(message);
                });
            }
        }, function (errorCallback) {
        });
    };

    $scope.deleteDoc = function (index) {
        $scope.tripData.files.splice(index, 1);
    };

}]);






