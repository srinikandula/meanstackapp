var app = angular.module('myApp',['ui.router']);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'students',
        url: '/students',
        templateUrl: 'views/students.html'
    }).state({
        name: 'employees',
        url: '/employees',
        templateUrl: 'views/employees.html'
    });

}]);

app.controller('StudentController', function($scope, $http) {
    $scope.students = [];
    $http({
        url: '/v1/students/getAll',
        method: "GET"
    }).then(function (response) {
        $scope.students = response.students;
        console.log('got students 245 '+ $scope.students);
    }, function (error) {
        console.log('error getting studetns list');
    });

});

app.controller('EmployeesController', function($scope, $http) {

});