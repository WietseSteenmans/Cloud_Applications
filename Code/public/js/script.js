var myApp = angular.module('Jarfish', []);

myApp.controller("QuestionCtrl", function($scope,$http){


     $("select").change(function () {

    var index = "";

    index = parseInt($("select option:selected").val());

    if(index ==1){
     $("#MultipleChoice").show();
     $("#YesNo").hide();
    }
    else if (index ==2) {
     $("#MultipleChoice").hide();
     $("#YesNo").show();
    }
    else{
     $("#MultipleChoice").hide();
     $("#YesNo").hide();
    }


});

  //Clearing Textboxes
  $scope.anotherQuestion = function(){

  document.getElementById('Question').value = "";
  document.getElementById('Questionyn').value = "";
  document.getElementById('answerinput1').value = "";
  document.getElementById('answerinput2').value = "";
  document.getElementById('answerinput3').value = "";
  document.getElementById('rightAnswer').value = "";

  }

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


  $scope.Choices = [{
    value: 'Yes',
    label: 'Yes'
  }, {
    value: 'No',
    label: 'No'
  }];   


  $scope.saveyesno = function() {

     var dataObj = {
      Coursename : $scope.Coursename,
      Question : $scope.Vraag,
      Answer : $scope.Choice
     };

     console.log(dataObj.Coursename);

     var res = $http.post('http://localhost:3000/YesNoLessen', dataObj)

     res.success(function(data, status, headers, config) {
        $scope.testdata = data;
        console.log($scope.testdata);
     });
  };


});

myApp.controller("LessenController", function($scope,$http){

  var res = $http.get('http://localhost:3000/GetLessen');

  var CourseArray = [];

  res.success(function(data, status, headers, config){
    $scope.data = data;
    console.log($scope.data);
    var lessData = $scope.data;
    for (var i = 0; i <= lessData.length -1; i++) {
      CourseArray.push(lessData[i].Coursename);
      CourseArray.sort();
    }
   var unique = CourseArray.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
      })
    $scope.Data = unique;
    console.log(typeof $scope.Data);
  });


  $scope.send = function (course){
    
      var div = document.getElementById('coursediv');
      div.style.display = "none";
      var divv = document.getElementById('vragenDiv');
      divv.style.display = "block";
      var dataToSend = JSON.stringify({
          "vak" : course
      });

      var config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      $http.post("/Vragen", dataToSend, config)
        .success(function (data,status,headers,config) {
            //console.log("recieved");
            $scope.response = data;
            // for (var i = 0; i <= $scope.response.length; i++) {
            //     SharedDataService.addCourse($scope.response[i]);
            // }
            //SharedDataService.addCourse($scope.response);
            console.log($scope.response);
        })
        .error(function (data,status,header,config) {
            console.log("Failed " + data);
            $scope.response = data;
        })

  }

  $scope.delete = function(array, index){
    array.splice(index, 1);

    var res = $http.post('http://localhost:3000/deleteLes');

    res.success(function(data,status,headers,config){
      $scope.data = data;
      console.log($scope.data);
    })
  }

});

// myApp.service('SharedDataService', function () {
//       var Course = [];

//       var addCourse = function(vak) {
//       Course.push(vak);
//       }
//       var getCourse = function() {
//       return Course;
//       }

//       return {addCourse: addCourse, getCourse: getCourse};
// });


// myApp.controller("Question", function($scope,SharedDataService) {
//   //console.log("I'm HERE");
//   $scope.vragen = SharedDataService.getCourse();
//   console.log($scope.vragen);
//   //console.log(vragen);
//  // $scope.response = vragen;
// });

myApp.controller("Activeles", function($scope.$http){

  var res = $http.post('http://localhost:3000/ActivateLessen');

  res.success(function(data, status, headers, config){
    $scope.Activelesdata = data;
    console.log($scope.Activelesdata);
  })
})