app.factory('Service', ['$http', function ($http) {
    return {
        login: function (loginData, success, error) {
            $http({
                url: '/v1/login/login',
                method: "POST",
                data: loginData
            }).then(success, error);
        }, signUp: function (signupData, success, error) {
            $http({
                url: '/v1/login/signUp',
                method: "POST",
                data: signupData
            }).then(success, error);
        },
    };

}]);

app.controller("loginController", ['$scope','$rootScope', 'Service', '$state', '$cookies', '$stateParams', function ($scope,$rootScope, Service, $state, $cookies, $stateParams) {
    $scope.logInData = {};
    $scope.value=false;
    $rootScope.isLoggedIn = false;
    $scope.userLogin= function () {
        Service.login($scope.logInData, function (successCallback) {
            if (successCallback.data.status) {
                $rootScope.isLoggedIn = true;
                console.log("is log in....",$scope.isLoggedIn);
                $cookies.put('token', successCallback.data.token);
                $state.go('tripsList');
            }
        }, function (error) {
            Notification.error(error);
        });
    };
    $scope.isLoggedIn = function(){
        if($cookies.get('token')){
            return true;
        }else{
            return false;
        }

    };
    $scope.register=function(){
        $state.go('signup');
    }
    $scope.logOutUser = function () {
        $cookies.remove('token');
        $state.go('login');
    };

}]);
app.controller("myCtrl", ['$scope', 'Service', '$state', '$cookies', '$http', function ($scope, Service, $state, $cookies, $http) {
    $scope.loginParams = {};
    $scope.isLoggedIn = false;
    $scope.login = function () {
        Service.login($scope.loginParams, function (successCallback) {
            if (successCallback.data.status) {
                $scope.isLoggedIn = true;
                $cookies.put('token', successCallback.data.token);
                $state.go('transList');
            }
        }, function (errorCallback) {

        });
    };
    // $scope.logOut = function () {
    //     $cookies.remove('token');
    //     $state.go('login');
    // };
    $scope.signUp = function () {
        Service.signUp($scope.signupParams, function (sucessCallback) {
            if (sucessCallback.data.status) {

            }
        });
    };
    $scope.signup = function () {
        $state.go('signup');
    };
}]);