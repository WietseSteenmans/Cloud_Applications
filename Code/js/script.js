var myApp = angular.module('PlateGate', []);

myApp.controller("SendCtrl", function($scope,$http){

  $scope.sendData = function() {

     var dataObj = {
      Vaknaam : $scope.Vaknaam,
      Onderwerp : $scope.Onderwerp,
      Vraag : $scope.Vraag,
      Antwoord1 : $scope.Antwoord1,
      Antwoord2 : $scope.Antwoord2,
      Antwoord3 : $scope.Antwoord3,
      Juistantwoord : $scope.Juistantwoord
     };

     console.log(dataObj);

     var res = $http.post('http://localhost:3000/Storage', dataObj)

     res.success(function(data, status, headers, config) {
        $scope.testdata = data;
        console.log($scope.testdata);
     });

       res.error(function(data, status, headers, config) {
         alert( "failure message: " + JSON.stringify({data: data}));
     });

  };

});

myApp.controller("LoginCtrl", function($scope,$http){



  // var res = $http.get('http://localhost:3000/Storage')

  // res.success(function(data, status, headers, config){
  //   $scope.testdata = data;
  //   JSON.stringify($scope.testdata);
  //   //console.log(JSON.stringify({data: data}));
  //   console.log($scope.testdata);
  // })



$scope.Login = function(){

var loginInfo =  {
  Username : $scope.Username,
  Password : $scope.Password
};


var res = $http.post('http://localhost:3000/Login', loginInfo)

res.success(function(data, status, headers, config){
  $scope.data = data;
  console.log($scope.data);
  if ($scope.data) {
    window.location.href = "http://localhost:3000/guestinfo"
  }
})

}

});


myApp.controller("RegisterCtrl", function($scope,$http){

  $scope.Register = function(){

  var RegisterInfo = {
    Email : $scope.Email,
    Username : $scope.Username,
    Password : $scope.Password
  };

  var res = $http.post('http://localhost:3000/Register', RegisterInfo)

  res.success(function(data, status, headers, config){
    $scope.data = data;
    console.log($scope.data);
  });

  }

});