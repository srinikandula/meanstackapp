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