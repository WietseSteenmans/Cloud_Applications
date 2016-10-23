var myApp = angular.module('Jarfish', []);

myApp.controller("MultipleChoiceCtrl", function($scope,$http){

  $scope.savemultiple = function() {

     var dataObj = {
      Coursename : $scope.Coursename,
      Question : $scope.Question,
      Antwoord1 : $scope.Answer1,
      Antwoord2 : $scope.Answer2,
      Antwoord3 : $scope.Answer3,
      RightAnswer : $scope.RightAnswer
     };

     console.log(dataObj);

     var res = $http.post('http://localhost:3000/MultipleChoiceLessen', dataObj)

     res.success(function(data, status, headers, config) {
        $scope.testdata = data;
        console.log($scope.testdata);
     });
  };

});

myApp.controller("YesNoController", function($scope,$http){


  $scope.Choices = [{
    value: 'Yes',
    label: 'Yes'
  }, {
    value: 'No',
    label: 'No'
  }];   


  $scope.saveyesno = function() {

     var dataObj = {
      Vaknaam : $scope.Coursename,
      Question : $scope.Vraag,
      Answer : $scope.Choice
     };

     console.log(dataObj);

     var res = $http.post('http://localhost:3000/YesNoLessen', dataObj)

     res.success(function(data, status, headers, config) {
        $scope.testdata = data;
        console.log($scope.testdata);
     });
  };

});

myApp.controller("LessenController", function($scope,$http){

  var res = $http.get('http://localhost:3000/GetLessen')

  res.success(function(data, status, headers, config){
    $scope.data = data;
    console.log($scope.data);
    console.log(JSON.stringify({data: data}));
  });
});



// myApp.controller("LoginCtrl", function($scope,$http){



//   // var res = $http.get('http://localhost:3000/Storage')

//   // res.success(function(data, status, headers, config){
//   //   $scope.testdata = data;
//   //   JSON.stringify($scope.testdata);
//   //   //console.log(JSON.stringify({data: data}));
//   //   console.log($scope.testdata);
//   // })



// $scope.Login = function(){

// var loginInfo =  {
//   Username : $scope.Username,
//   Password : $scope.Password
// };


// var res = $http.post('http://localhost:3000/Login', loginInfo)

// res.success(function(data, status, headers, config){
//   $scope.data = data;
//   console.log($scope.data);
// })

// }

// });


// myApp.controller("RegisterCtrl", function($scope,$http){

//   $scope.Register = function(){

//   var RegisterInfo = {
//     Email : $scope.Email,
//     Username : $scope.Username,
//     Password : $scope.Password
//   };

//   var res = $http.post('http://localhost:3000/Register', RegisterInfo)

//   res.success(function(data, status, headers, config){
//     $scope.data = data;
//     console.log($scope.data);
//   });

//   }

// });
