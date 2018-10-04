
app.factory('paymentService', ['$http', '$cookies', function ($http, $cookies) {
    return {
        addPayment: function (params, success, error) {
            $http({
                url: '/v1/payments/addPayment',
                method: "POST",
                data: params
            }).then(success, error)
        },
        updateTrip: function (params, success, error) {
            $http({
                url: 'v1/tripes/updateTrip',
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
                url: 'v1/tripes/getOne/' + _id,
                method: "GET"
            }).then(success, error)
        }, tripDelete: function (_id, success, error) {
            $http({
                url: 'v1/tripes/removeTrip/' + _id,
                method: "DELETE"
            }).then(success, error)
        }
    }
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
            tripService.updateTrip(params, function (response) {
                console.log('response', response)
                if (response.data.status)
                    $state.go('paymentsList');
            }, function () {
            });
        } else {
            paymentService.addPayment(params, function (success) {
                if (success.data.status) {
                    console.log("addes successfully");
                }
            }, function (err) {
            })
            $state.go('tripsList');
        }
    };


}]);
app.controller("paymentListController", ['paymentService', '$scope', '$http', '$state', '$stateParams', function (paymentService, $scope, $http, $state, $stateParams) {

    $scope.getall = function () {
            tripService.getAllPayments( function (response) {
                console.log('response', response)
                $scope.payments=response.data.data;
                $state.go('paymentsList');
            }, function () {
            });
        }



}]);