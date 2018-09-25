var app = angular.module('myApp', ['ui.router', 'UserValidation']);

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
      })
      .state({
        name: 'home',
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state({
        name: 'editEmp',
        url: '/editemp/:id',
        templateUrl: 'views/editemp.html'
      })
      .state({
        name: 'students',
        url: '/students',
        templateUrl: 'views/students.html'
      })
      .state({
        name: 'employees',
        url: '/employees',
        templateUrl: 'views/employees.html'
      })
      .state({
        name: 'editemp',
        url: '/editemp',
        templateUrl: 'views/editemp.html'
      });
  }
]);



app.controller('StudentController', function ($scope, $http) {
  $scope.students = [];
  $http({
    url: '/v1/students/getAll',
    method: 'GET'
  }).then(
    function (response) {
      $scope.students = response.data.students;
      console.log('got students 245 ' + $scope.students);
      console.log(response);
    },
    function (error) {
      console.log('error getting studetns list');
    }
  );
});

app.controller('EmployeesListController', function (
  $scope,
  $http,
  $state,
  $stateParams
) {
  $scope.employees = [];
  $scope.employeeData = {
    username: '',
    password: '',
    co_password: '',
    dep: '',
    id: '',
    dob: '',
    doj: '',
    gender: '',
    mobileno: '',
    age: '',
    salary: '',
    image: ''
  };

  $scope.departments = [];
  $scope.departmentData = {
    dep: ''
  };

  $http({
    url: '/v1/employees/getAll',
    method: 'GET'
  }).then(
    function (response) {
      $scope.employees = response.data.data;
      console.log('got employees 245 ' + $scope.employees);
    },
    function (error) {
      console.log('error getting employees list');
    }
  );

  $http({
    url: '/v1/departments/getAllDep',
    method: 'GET'
  }).then(
    function (response) {
      $scope.departments = response.data.departments;
      console.log('got departments 245 ' + $scope.departments);
    },
    function (error) {
      console.log('error getting departments list');
    }
  );

  $scope.empRemove = function (_id) {
    console.log(_id);
    $http.delete('/v1/employees/remove/' + _id).then(function (response) {
      console.log(response);
    });
  };

  $scope.empEdit = function (_id) {
    console.log('ID', _id);
    $state.go('editEmp', {
      id: _id
    });
    console.log(_id);
  };

  $scope.getEmployeeDetails = function () {
    // console.log('$stateParams.id', $stateParams.id);
    if ($stateParams.id) {
      $http
        .get('/v1/employees/getOne/' + $stateParams.id)
        .then(function (response) {
          console.log('got employee', response);
          $scope.employeeData = response.data.data;
          $scope.employeeData.dob = new Date($scope.employeeData.dob);
          $scope.employeeData.doj = new Date($scope.employeeData.doj);
          console.log($scope.employeeData);
        });
    } else {}
  };

  $scope.getEmployeeDetails();

  $scope.EmpFormSubmit = function () {
    var params = $scope.employeeData;

    if (params._id) {
      console.log('id', params._id);
      $http.put('v1/employees/updateEmp', params).then(function (response) {
        console.log(response);
      });
    } else {
      $http.post('/v1/employees/add', params);
      console.log('sjghlk', $scope.employeeData);
      console.log('data', params);
    }
  };
  $scope.resetForm = function () {
    $scope.employeeData = angular.copy($scope.employeeData);
  };

  $scope.calculateAge = function (dob) {
    // console.log('hiiiii', dob);
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    $scope.employeeData.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  $scope.employeeData.doj = new Date();

  $scope.checkName = function () {
    // alert('hiii');
    var params = {
      username: $scope.employeeData.username,
      // userId: $scope.employeeData.id
    };
    $http.post('v1/employees/findname', params).then(function (response) {
      if (response.data.status) {
        $scope.Color = "red";
        $scope.Message = "Name is NOT available";
        console.log(response);

      } else {
        $scope.Color = "green";
        $scope.Message = "Name is available";
        // console.log("error while getting the data");
      }
    }, function (err) {

    });
  };

  $scope.login = function () {
    alert('login');
    var params = {
      username: $scope.employeeData.username,
      password: $scope.employeeData.password
    };
    $http.post('v1/employees/login', params).then(function (response) {
      if (login($scope.employeeData.username, $scope.employeeData.password)) {
        $rootScope.username = $scope.employeeData.username;
        $scope.error = '';
        $scope.employeeData.username = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "Incorrect username/password !";
      }
    });
  };
});

angular.module('UserValidation', []).directive('validPasswordC', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue, $scope) {
        var noMatch = viewValue != scope.empData.password.$viewValue;
        ctrl.$setValidity('noMatch', !noMatch)
      })
    }
  }
})