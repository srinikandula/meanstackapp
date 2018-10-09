var app = angular.module('myApp', ['ui.router', 'UserValidation', 'ngCookies', 'ngFileUpload','ui-notification']);
// ngFileUpload
app.config([
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider
            .state({
                name: 'login',
                url: '/login',
                templateUrl: 'views/login_view.html'
            }).state({
            name: 'signup',
            url: '/signup',
            templateUrl: 'views/signup.html'
        }).state({
            name: 'tripEdit',
            url: '/tripEdit/:id',
            templateUrl: 'views/tripEdit.html',
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
        })    .state({
            name: 'transactions',
            url: '/transactions',
            templateUrl: 'views/transactions.html'
        }) .state({
            name: 'edittransactions',
            url: '/edittransactions/:id',
            templateUrl: 'views/edittransactions.html'
        }).state({
            name: 'transList',
            url: '/transList',
            templateUrl: 'views/transList.html'
        }) .state({
            name: 'UserAccounts',
            url: '/UserAccounts',
            templateUrl: 'views/users.html'
        });

        $urlRouterProvider.otherwise('/login');

    }
]);
app.config(['$httpProvider',function ($httpProvider) {
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
                    console.log('found error');
                    $cookies.remove('token');

                    console.log("$location.url()",$location.url());
                    if(!$location.url().startsWith('/login')){
                        $location.path('/login');
                        return;
                    }
                    return $q.reject(error);
                }
            }
        };
    }]);
}]);

app.config(['NotificationProvider', '$httpProvider', function (NotificationProvider, $httpProvider) {
    NotificationProvider.setOptions({
        delay: 3000,
        startTop: 150,
        startRight: 500,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'center',
        positionY: 'bottom'
    });
}]);


angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.empData.password.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch);
            });
        }
    };
});


