app.factory('Service', ['$http', function ($http) {
    return {
      login: function (loginData, success, error) {
        $http({
          url: '/v1/login/logIn',
          method: "POST",
          data: loginData
        }).then(success, error);
      },
      signUp: function (signupData, success, error) {
        $http({
          url: '/v1/login/signUp',
          method: "POST",
          data: signupData
        }).then(success, error);
      },
      Find: function (signupData, success, error) {
        $http({
          url: '/v1/login/signUp',
          method: "POST",
          data: signupData
        }).then(success, error);
      }
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
    $scope.logOut = function () {
      console.log("log out function....");
      $cookies.remove('token');
      $state.go('login');
    };
    $scope.signUp = function () {
      Service.signUp($scope.signupParams, function (sucessCallback) {
        console.log("quack quack");
        if (sucessCallback.data.status) {
  
        }
  
      });
  
    };
    $scope.signup = function () {
      $state.go('signup');
    };
  
    $http({
      url: '/v1/login/getAll',
      method: 'GET'
    }).then(
      function (response) {
        console.log('got users ', response);
  
  
        $scope.users = response.data.users;
      },
      function (error) {
        console.log('error getting users list');
      }
    );
  
    $scope.findCheckName = function () {
      // alert('hiii');
      var params = {
        username: $scope.signupParams.userName,
        contactPhone: $scope.signupParams.contactPhone,
      };
      console.log(params);
      $http.post('v1/login/findCheckName', params).then(function (response) {
        if (response.data.status) {
          $scope.Color = "red";
          $scope.Message = "Username already exists";
          console.log(response);
  
        } else {
          $scope.Color = "green";
          $scope.Message = "Username is available";
          // console.log("error while getting the data");
        }
      }, function (err) {
  
      });
    };
  }]);