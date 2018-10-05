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
  
        $scope.transactions = response.data.transactions;
      },
      function (error) {
      }
    );
  
  
    $scope.transRemove = function (_id) {
      $http.delete('/v1/transactions/remove/' + _id).then(function (response) {
      });
    };
  
    $scope.transEdit = function (_id) {
      $state.go('edittransactions', {
        id: _id
      });
    };
  
    $scope.getTransactionDetails = function () {
      if ($stateParams.id) {
        $http
          .get('/v1/transactions/getOne/' + $stateParams.id)
          .then(function (response) {
            $scope.transData = response.data.data;
            $scope.transData.Date = new Date($scope.transData.Date);
          });
      } else {}
    };
  
    $scope.getTransactionDetails();
  
    $scope.transFormSubmit = function () {
      var params = $scope.transData;
  
      if (params._id) {
        $http.put('v1/transactions/updateTransactions', params).then(function (response) {
        });
      } else {
        $http.post('/v1/transactions/add', params);
      }
    };
    $scope.resetForm = function () {
      $scope.transData = angular.copy($scope.transData);
    };
  
    $scope.transData.date = new Date();
  });