var app = angular.module('myApp', ['ui.router', 'ngCookies']);



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
      name: 'tripes',
      url: '/tripes',
      templateUrl: 'views/trip_view.html'
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
      name: 'UserAccounts',
      url: '/UserAccounts',
      templateUrl: 'views/users.html'
    })

    .state({
      name: 'edittransactions',
      url: '/edittransactions/:id',
      templateUrl: 'views/edittransactions.html'
    }).state({
      name: 'tripEdit',
      url: '/tripEdit/:id',
      templateUrl: 'views/trip_view.html',
      data:{id:null}
  }).state({
      name: 'tripsList',
      url: '/tripsList',
      templateUrl: 'views/tripsList.html'
  }).state({
      name: 'addTrip',
      url: '/addTrip',
      templateUrl: 'views/trip_view.html'
  }).state({
      name: 'addPayment',
      url: '/addPayment',
      templateUrl: 'views/addEditPayment.html'
  }).state({
      name: 'paymentList',
      url: '/paymentList',
      templateUrl: 'views/paymentsList.html'
  }).state({
      name: 'paymentEdit',
      url: '/paymentEdit/:id',
      templateUrl: 'views/addEditPayment.html'
  });

  $urlRouterProvider.otherwise('/login');
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