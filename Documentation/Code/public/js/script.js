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

  $scope.NewCourse = function(){

    var dataObj = {
      Coursename : $scope.NewCourseName
    }

     var res = $http.post('http://localhost:3000/addCourse', dataObj)

     res.success(function(data, status, headers, config) {
        $scope.testdata = data;
        console.log($scope.testdata);
     });
  };

  $scope.delete = function(array, index){
    array.splice(index, 1);

    var res = $http.post('http://localhost:3000/deleteLes');

    res.success(function(data,status,headers,config){
      $scope.data = data;
      console.log($scope.data);
    })
  }
  // Random Colored Buttons
  $scope.doc_classes_colors = [
             "#10ADED",
             "#C0FF33",
             "#C0FFEE",
             "#1CE",
             "#BADA55"
        ];

        function shuffle(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        }
  shuffle($scope.doc_classes_colors);
  
  $scope.getRandomColor = function () {
          $scope.bgColor = $scope.doc_classes_colors[Math.floor(Math.random() * $scope.doc_classes_colors.length)];
  };

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

myApp.controller("Activeles", function($scope,$http){

var Qcounter = 0;


  var res = $http.get('http://localhost:3000/dataFilter');

  res.success(function(data, status, headers, config){
    $scope.Activelesdata = data;
    console.log($scope.Activelesdata);
    var r = Math.floor(Math.random() * 4);
    console.log(r);
    GrafiekOptieArray[0]($scope.Activelesdata);

      $scope.nextQ = function(){
  	Qcounter++;
  	GrafiekOptieArray[0]($scope.Activelesdata);
  	console.log(Qcounter);
  	if(Qcounter == $scope.Activelesdata.length){
  		Qcounter = 0;
  }
  if ($scope.Activelesdata[Qcounter].Answer) {
  	GrafiekOptieArray[2]($scope.Activelesdata);
  }
}

  });


    var GrafiekOptieArray = [];
     var barGrafiek = function(data){
     	console.log(data[0]);

      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: data[Qcounter].Answer1,
            data: [8],
            backgroundColor: "rgba(153,255,51,0.4)"
          }, {
            label: data[Qcounter].Answer2,
            data: [4],
            backgroundColor: "rgba(255,153,0,0.4)"
          },{
            label: data[Qcounter].Answer3,
            data: [1],
            backgroundColor:"rgba(0,153,255,0.4)"
          },{
            label: data[Qcounter].RightAnswer,
            data: [5],
            backgroundColor:"rgba(153,0,255,0.4)"
          }]
        },
        options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          max: 10,
                          min: 0,
                          stepSize: 1
                      }
                  }]
              }
          }
        });
    }

    GrafiekOptieArray.push(barGrafiek);
    console.log(GrafiekOptieArray);

    var lijnGrafiek = function(data){

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "rgba(153,255,51,0.4)"
    }, {
      label: 'oranges',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: "rgba(255,153,0,0.4)"
    }]
  }
});

  }


  GrafiekOptieArray.push(lijnGrafiek);

  var pieGrafiek = function(data){
    var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["M", "T", "W", "T"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6"
      ],
      data: [12, 19, 0, 0]
    }]
  }
});
  }

  GrafiekOptieArray.push(pieGrafiek);

    var doughnutGrafiek = function(data){

    var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [12, 19, 3, 17, 28, 24, 7]
    }]
  }
});

  }

  GrafiekOptieArray.push(doughnutGrafiek);

  // var r = Math.floor(Math.random() * 4);
  // console.log(r);
  // GrafiekOptieArray[r]();
});
