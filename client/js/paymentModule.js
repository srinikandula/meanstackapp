
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
        }, paymentDelete: function (_id, success, error) {
            $http({
                url: '/v1/payments/removePayment/' + _id,
                method: "DELETE"
            }).then(success, error)
        }
    }
}]);
app.controller("addorEditPaymentController", ['paymentService', '$scope', '$http', '$state', '$stateParams','Notification', function (paymentService, $scope, $http, $state, $stateParams,Notification) {
    $scope.tripes = [];
    $scope.choices = [''];

    $scope.paymentData = {
        date: '',
        amount: '',
        discription: ''
    };
    $scope.goToPayments=function(){
        $state.go('paymentList');
    }

    $scope.addorEditPayment = function () {
        var params = $scope.paymentData;
        if (params._id) {
            paymentService.updatePayment(params, function (response) {
                if (response.data.status)
                    $state.go('paymentList');
                Notification.success("Payment Updated Successfully");
            }, function (error) {
                Notification.error(error);
            });
        } else {
            paymentService.addPayment(params, function (success) {
                if (success.data.status) {
                    $state.go('paymentList');
                    Notification.success("Payment Added Successfully");

                }
            }, function (error) {
                Notification.error(error);
            })

        }
    };
    $scope.getAll = function () {
        paymentService.getAllPayments( function (response) {
            $scope.payments=response.data.payments;
            $state.go('paymentsList');
        }, function (error) {
            Notification.error()
        });
    }
    $scope.addpayment=function(){
        $state.go('addPayment');
    }
    $scope.getAll();
    $scope.paymentRemove = function (_id) {
        paymentService.paymentDelete(_id, function (response) {
            if (response.data.status) {
                $scope.getAll();
                Notification.success("deleted successfully");
            }
        }, function (error) {
            Notification.error(error);
        })
    };
    if ($stateParams.id) {
        paymentService.getOne($stateParams.id, function (success) {
            if (success.data.status) {
                $scope.paymentData = success.data.data;
                if( $scope.paymentData.date !== undefined){
                    $scope.paymentData.date=new Date($scope.paymentData.date);
                }
            }
        }, function (error) {
            Notification.error(error);
        })

    }


}]);
// app.controller("paymentListController", ['paymentService', '$scope', '$http', '$state', '$stateParams', function (paymentService, $scope, $http, $state, $stateParams) {
//
//     $scope.getAll = function () {
//         paymentService.getAllPayments( function (response) {
//             $scope.payments=response.data.payments;
//             $state.go('paymentsList');
//         }, function (error) {
//             Notification.error()
//         });
//     }
//
//
// }]);