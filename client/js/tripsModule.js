app.factory('tripService', ['$http', '$cookies', function ($http, $cookies) {
    return {
        addTrip: function (params, success, error) {
            $http({
                url: '/v1/tripes/addTrip',
                method: "POST",
                data: params
            }).then(success, error);
        },
        updateTrip: function (params, success, error) {
            $http({
                url: 'v1/tripes/updateTrip',
                method: "PUT",
                data: params
            }).then(success, error);
        },
        getAllTripes: function (success, error) {
            $http({
                url: '/v1/tripes/getAllTripes',
                method: "GET"
            }).then(success, error);
        },
        getOne: function (_id, success, error) {
            $http({
                url: 'v1/tripes/getOne/' + _id,
                method: "GET"
            }).then(success, error);
        },
        tripDelete: function (_id, success, error) {
            $http({
                url: 'v1/tripes/removeTrip/' + _id,
                method: "DELETE"
            }).then(success, error);
        }
    }
}]);
app.factory('paymentService', ['$http', '$cookies', function ($http, $cookies) {
    return {
        addPayment: function (params, success, error) {
            $http({
                url: '/v1/payments/addPayment',
                method: "POST",
                data: params
            }).then(success, error)
        },
        updatePayment: function (params, success, error) {
            $http({
                url: '/v1/payments/updatePayment',
                method: "PUT",
                data: params
            }).then(success, error)
        },
        getAllPayments: function (success, error) {
            $http({
                url: '/v1/payments/getAllPayments',
                method: "GET"
            }).then(success, error)
        },
        getOne: function (_id, success, error) {
            $http({
                url: '/v1/payments/getOne/' + _id,
                method: "GET"
            }).then(success, error)
        },
        paymentDelete: function (_id, success, error) {
            $http({
                url: '/v1/payments/removePayment/' + _id,
                method: "DELETE"
            }).then(success, error)
        }
    }
}]);


app.controller("TripesListController", ['tripService', '$scope', '$http', '$state', '$stateParams', function (tripService, $scope, $http, $state, $stateParams) {
    $scope.tripes = [];
    $scope.choices = [''];

    $scope.tripData = {
        vehicleNumber: '',
        driverName: '',
        driverNumber: '',
        fileUpload: '',
        from: '',
        toCitys: [{
            index: 0
        }],
        freightAmount: '',
        paidAmount: ''
    };


    $scope.addNewChoice = function () {
        var length = $scope.tripData.toCitys.length;
        if (!$scope.tripData.toCitys[length - 1].name) {
            // $scope.party.error.push("Please Enter To Field");

        } else {
            $scope.tripData.toCitys.push({
                index: length
            });

        }
    };

    $scope.deleteToCitys = function (index) {
        if ($scope.tripData.toCitys.length > 1) {
            $scope.tripData.toCitys.splice(index, 1);
        } else {
            Notification.error("Please add at least one Additional Charge");
        }
    }


    $scope.TripFormSubmit = function () {
        var params = $scope.tripData;

        console.log('tripdata', $scope.tripData._id);
        if (params._id) {

            console.log('id', params._id);
            tripService.updateTrip(params, function (response) {
                console.log('response', response)
                if (response.data.status)
                    $state.go('tripsList');
            }, function () {});
        } else {
            tripService.addTrip(params, function (success) {
                if (success.data.status) {
                    console.log("addes successfully");
                }
            }, function (err) {})
            $state.go('tripsList');
        }
    };

    $scope.getAll = function () {
        tripService.getAllTripes(function (response) {
                $scope.tripes = response.data.tripes;
                console.log('got tripes 245 ' + $scope.tripes);
            },
            function (error) {
                console.log('error getting tripes list');
            })
    }

    $scope.getAll();
    console.log("$stateParams", $stateParams);


    if ($stateParams.id) {
        tripService.getOne($stateParams.id, function (success) {
            if (success.data.status) {
                $scope.tripData = success.data.data;
            }
        }, function (error) {
            console.log("error while getting the data");
        })

    }

    $scope.tripRemove = function (_id) {
        tripService.tripDelete(_id, function (response) {
            console.log(response);
            if (response.data.status) {}
        }, function (err) {})
    };
}]);
app.controller("addorEditPaymentController", ['paymentService', '$scope', '$http', '$state', '$stateParams', function (paymentService, $scope, $http, $state, $stateParams) {
    $scope.tripes = [];
    $scope.choices = [''];

    $scope.paymentData = {
        date: '',
        amount: '',
        discription: ''
    };
    $scope.addorEditPayment = function () {
        var params = $scope.paymentData;
        if (params._id) {
            paymentService.updatePayment(params, function (response) {
                if (response.data.status)
                    $state.go('paymentList');
            }, function () {});
        } else {
            paymentService.addPayment(params, function (success) {
                if (success.data.status) {
                    console.log("addes successfully");
                    $state.go('paymentList');
                }
            }, function (err) {})

        }
    };
    if ($stateParams.id) {
        paymentService.getOne($stateParams.id, function (success) {
            if (success.data.status) {
                console.log('success', success.data.data);
                $scope.paymentData = success.data.data;
            }
        }, function (error) {
            console.log("error while getting the data");
        })

    }


}]);
app.controller("paymentListController", ['paymentService', '$scope', '$http', '$state', '$stateParams', function (paymentService, $scope, $http, $state, $stateParams) {

$scope.getAll = function () {
paymentService.getAllPayments(function (response) {
    console.log('response', response)
    $scope.payments = response.data.payments;
    console.log('payments', $scope.payments);
    $state.go('paymentsList');
}, function () {});
}
$scope.getAll();
$scope.paymentRemove = function (_id) {
paymentService.paymentDelete(_id, function (response) {
    if (response.data.status) {}
}, function (err) {})
};
}]);




}]);