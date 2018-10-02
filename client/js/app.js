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
      name: 'home',
      url: '/home',
      templateUrl: 'views/home.html'
    })
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
      name: 'editEmp',
      url: '/editEmp/:id',
      templateUrl: 'views/editemp.html'
    })
    .state({
      name: 'students',
      url: '/students',
      templateUrl: 'views/students.html'
    })

    .state({
      name: 'editStudent',
      url: '/editStudent/:id',
      templateUrl: 'views/editStudent.html'
    })

    .state({
      name: 'employees',
      url: '/employees',
      templateUrl: 'views/employees.html'
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

    .state({
      name: 'editemp',
      url: '/editemp',
      templateUrl: 'views/editemp.html'
    });
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



app.controller('StudentsListController', function (
  $scope,
  $http,
  $state,
  $stateParams
) {
  $scope.students = [];
  $scope.studentData = {
    name: '',
    dep: '',
    id: '',
    dob: '',
    doj: '',
    gender: '',
    mobileno: '',
    age: '',
    image: ''
  };
  $scope.value = 10;

  $scope.departments = [];
  $scope.departmentData = {
    dep: ''
  };

  $http({
    url: '/v1/students/getAll',
    method: 'GET'
  }).then(
    function (response) {
      $scope.students = response.data.data;
      console.log('got students 245 ' + $scope.students);
      console.log(response);
    },
    function (error) {
      console.log('error getting studetns list');
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

  $scope.studentRemove = function (_id) {
    console.log(_id);
    $http.delete('/v1/students/remove/' + _id).then(function (response) {
      console.log(response);
    });
  };

  $scope.studentEdit = function (_id) {
    console.log('ID', _id);
    $state.go('editStudent', {
      id: _id
    });
    console.log(_id);
  };

  $scope.getStudentDetails = function () {
    if ($stateParams.id) {
      $http
        .get('/v1/students/getOne/' + $stateParams.id)
        .then(function (response) {
          $scope.studentData = response.data.data;
          $scope.studentData.dob = new Date($scope.studentData.dob);
          $scope.studentData.doj = new Date($scope.studentData.doj);
          console.log($scope.studentData);
        });
    } else {}
  };

  $scope.getStudentDetails();

  $scope.StudentFormSubmit = function () {
    alert('hiii');
    var params = $scope.studentData;

    if (params._id) {
      console.log('id', params._id);
      $http.put('v1/students//updateStudents/:id', params).then(function (response) {
        console.log(response);
      });
    } else {
      $http.post('/v1/students/add', params);
      console.log('sjghlk', $scope.studentData);
    }
  };
  $scope.resetForm = function () {
    $scope.studentData = angular.copy($scope.studentData);
  };

  $scope.calculateAge = function (dob) {
    // console.log('hiiiii', dob);
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    $scope.studentData.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  $scope.studentData.doj = new Date();


});

app.controller('EmployeesListController', function (
  $scope,
  $http,
  $state,
  $stateParams
) {
  $scope.employees = [];
  $scope.employeeData = {
    name: '',
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
});

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