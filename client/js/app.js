var app = angular.module('myApp', ['ui.router', 'ngCookies']);

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


app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider
    
    .state({
      name: 'signup',
      url: '/signup',
      templateUrl: 'views/signup.html'
    })
    .state({
      name: 'login',
      url: '/login',
      templateUrl: 'views/login.html'
    })

    .state({
      name: 'transactions',
      url: '/transactions',
      templateUrl: 'views/transactions.html'
    })

    .state({
      name: 'transList',
      url: '/transList',
      templateUrl: 'views/transList.html'
    })

    .state({
      name: 'edittransactions',
      url: '/edittransactions/:id',
      templateUrl: 'views/edittransactions.html'
    })

  // $urlRouterProvider.otherwise('/login');
}]);

app.config(['$httpProvider', function ($httpProvider) {

  // Interceptor for redirecting to login page if not logged in
  $httpProvider.interceptors.push(['$q', '$location', '$rootScope', '$cookies', function ($q, $location, $rootScope, $cookies) {
    return {
      'request': function (config) {
        $rootScope.reqloading = true;
        return config;
      },
      'response': function (config) {
        $rootScope.reqloading = false;
        return config;
      },
      'responseError': function (error) {
        let status = error.status;
        console.log('status ' + error.status);
        if ([400, 401, 402, 403].indexOf(status) > -1) {
          $cookies.remove('token');
          $location.path('/login');
          return $q.reject(error);
        }
      }
    };
  }]);
}]);


app.controller('transListController', function ($scope, $http, $state, $stateParams) {
  $scope.transactions = [];
  $scope.transData = {
    Date: '',
    Name: '',
    mobileno: '',
    tonnage: '',
    rate: ''
  };

  $http({
    url: '/v1/transactions/getAll',
    method: 'GET'
  }).then(
    function (response) {
      console.log('got transactions 245 ', response);

      $scope.transactions = response.data.transactions;
      console.log($scope.transactions + "   blhhhh");
    },
    function (error) {
      console.log('error getting transactions list');
    }
  );


  $scope.transRemove = function (_id) {
    console.log(_id);
    $http.delete('/v1/transactions/remove/' + _id).then(function (response) {
      console.log(response);
    });
  };

  $scope.transEdit = function (_id) {
    console.log('ID', _id);
    $state.go('edittransactions', {
      id: _id
    });
    console.log(_id);
  };

  $scope.getTransactionDetails = function () {
    console.log('function......', $stateParams.id);
    if ($stateParams.id) {
      console.log("if block.....");
      $http
        .get('/v1/transactions/getOne/' + $stateParams.id)
        .then(function (response) {
          console.log('got transactions', response);
          $scope.transData = response.data.data;
          $scope.transData.Date = new Date($scope.transData.Date);
          console.log($scope.transData);
        });
    } else {}
  };

  $scope.getTransactionDetails();

  $scope.transFormSubmit = function () {
    var params = $scope.transData;

    if (params._id) {
      console.log('id', params._id);
      $http.put('v1/transactions/updateTransactions', params).then(function (response) {
        console.log(response);
      });
    } else {
      $http.post('/v1/transactions/add', params);
      console.log('added', $scope.transData);
    }
  };
  $scope.resetForm = function () {
    $scope.transData = angular.copy($scope.transData);
  };

  $scope.transData.date = new Date();
});

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