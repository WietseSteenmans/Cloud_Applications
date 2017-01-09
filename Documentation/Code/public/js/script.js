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

  //Clearing Textboxes
  $scope.anotherQuestion = function(){

  document.getElementById('Question').value = " ";
  document.getElementById('Questionyn').value = " ";
  document.getElementById('answerinput1').value = " ";
  document.getElementById('answerinput2').value = " ";
  document.getElementById('answerinput3').value = " ";
  document.getElementById('rightAnswer').value = " ";

  }

  $scope.SendOption = function(option){
    console.log(option);
  }

  $scope.savemultiple = function() {

     var dataObj = {
      Coursename : $scope.Coursename,
      Question : $scope.Question,
      Antwoord1 : $scope.Answer1,
      Antwoord2 : $scope.Answer2,
      Antwoord3 : $scope.Answer3,
      RightAnswer : $scope.RightAnswer,
      QuestionType : 'MultipleChoice'
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
      RightAnswer : $scope.Choice,
      QuestionType : 'YesNo'
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

    var toedit = [];


  var RightAnswer = document.getElementById('RightAnswer');

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

  // $scope.NewCourse = function(){

  //   var dataObj = {
  //     Coursename : $scope.NewCourseName
  //   }

  //    var res = $http.post('http://localhost:3000/addCourse', dataObj)

  //    res.success(function(data, status, headers, config) {
  //       $scope.testdata = data;
  //       console.log($scope.testdata);
  //    });
  // };

  $scope.delete = function(array, index){
    console.log(array[index]._id);
    console.log(index);

    var dataObj = {
      id : array[index]._id
    }
    console.log(dataObj);

    var res = $http.post('http://localhost:3000/deleteLes', dataObj);
    array.splice(index, 1);
    res.success(function(data,status,headers,config){
      $scope.data = data;
      console.log($scope.data);
    });
  };


  $scope.edit = function(array, index){
    var Question = document.getElementById('Question' +index);
    console.log(Question);
    var RightAnswer = document.getElementById('RightAnswer'+index);
    console.log(Question.innerHTML);
    console.log(RightAnswer.innerHTML);
    console.log(array[index]);
     var dataObj = {
      Coursename : array[index].Coursename,
      Question : Question.innerHTML,
      QuestionType : array[index].QuestionType,
      Antwoord1 : array[index].Answer1,
      Antwoord2 : array[index].Answer2,
      Antwoord3 : array[index].Answer3,
      RightAnswer : RightAnswer.innerHTML,
      id : array[index]._id
     };

     console.log(dataObj);

     var res = $http.post('http://localhost:3000/editLes', dataObj);
  }


   // var Question = document.getElementById('Question');
   //  console.log(Question);
   //  Question = addEventListener('blur', function(){
   //    console.log(this.innerHTML);
   //    toedit.push(this.innerHTML);
   //    console.log(toedit);
   //  });

 
    $scope.deletecourse = function(x, array, index){
    console.log(x);
    console.log(array);
    console.log(index);

    var dataObj = {
      vak : x
    }

    // var courseids = [];

    // var res = $http.post('http://localhost:3000/Vragen', dataObj);

    // res.success(function(data, status, headers, config){
    //   $scope.data = data;
    //   console.log($scope.data)


      // console.log(courseids);

    var ress = $http.post('http://localhost:3000/deletecourse', dataObj);

    ress.success(function(data, status, headers, config){
      $scope.data = data;
      console.log(data);

    });  
    array.splice(index, 1);
    // })
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

  var currentpos = 0;

    var socket = io('http://localhost');
    socket.on('message', function(data) {
      var div = document.getElementById('ExplainDiv');
        div.style.display = "none";
      var divv = document.getElementById('quetionsdiv');
      divv.style.display = 'block';
      $scope.Activelesdata = data;
      console.log($scope.Activelesdata);   
    document.getElementById('Coursename').innerHTML = "Course  : " + $scope.Activelesdata[currentpos].Coursename;
    document.getElementById('labe1').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].Answer1;
    document.getElementById('labe2').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].Answer2;
    document.getElementById('labe3').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].Answer3;
    document.getElementById('labe4').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].RightAnswer;
    document.getElementById('question').innerHTML = "Question : " + $scope.Activelesdata[currentpos].Question;

    var cards = $(".gallerycard");
     for(var i = 0; i < cards.length; i++){
    var target = Math.floor(Math.random() * cards.length -1) + 1;
    var target2 = Math.floor(Math.random() * cards.length -1) +1;
    cards.eq(target).before(cards.eq(target2));
}

  });

  socket.on('nextQ', function(data){
    var canvas = document.getElementById('myChart');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('Wrong1').style.border = "none";
    document.getElementById('Wrong2').style.border = "none";
    document.getElementById('Wrong3').style.border = "none";
    document.getElementById('Right').style.border = "none";
   currentpos += data;
   console.log(currentpos);
   console.log($scope.Activelesdata[1].RightAnswer);
   switch($scope.Activelesdata[currentpos].QuestionType){
    case 'YesNo':
    document.getElementById('question').innerHTML = "Question : " + $scope.Activelesdata[currentpos].Question;
    document.getElementById('labe4').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].RightAnswer;
    document.getElementById('labe2').style.display = "none";
   document.getElementById('labe3').style.display = "none";
    if ($scope.Activelesdata[currentpos].RightAnswer == 'Yes') {
      document.getElementById('labe1').innerHTML = "Answer  : " + 'No';
    }
    else
      document.getElementById('labe1').innerHTML = "Answer  : " + 'Yes';
    break;
    case  'MultipleChoice':
        document.getElementById('labe1').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].Answer1;
        document.getElementById('labe2').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].Answer2;
        document.getElementById('labe3').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].Answer3;
        document.getElementById('labe4').innerHTML = "Answer  : " + $scope.Activelesdata[currentpos].RightAnswer;
        document.getElementById('question').innerHTML = "Question : " + $scope.Activelesdata[currentpos].Question;
    //GrafiekOptieArray[position](data);
    break;
   }

     var cards = $(".gallerycard");
     for(var i = 0; i < cards.length; i++){
    var target = Math.floor(Math.random() * cards.length -1) + 1;
    var target2 = Math.floor(Math.random() * cards.length -1) +1;
    cards.eq(target).before(cards.eq(target2));
}


  });

  socket.on('Answers', function(data){
    console.log(data);
    switch($scope.Activelesdata[currentpos].QuestionType){
      case 'MultipleChoice':
      GrafiekOptieArray[0](data);
      break;
      case 'YesNo':
      GrafiekOptieArray[1](data);
      break;
    }
  });

  socket.on('CorrentQ', function(data){
    document.getElementById('Wrong1').style.border = "thin solid red";
    document.getElementById('Wrong2').style.border = "thin solid red";
    document.getElementById('Wrong3').style.border = "thin solid red";
    document.getElementById('Right').style.border = "thin solid green";

    console.log(data);
  })

// var Qcounter = 0;


//   var res = $http.get('http://localhost:3000/dataFilter');

//   res.success(function(data, status, headers, config){
//     $scope.Activelesdata = data;
//     console.log($scope.Activelesdata);
//     var r = Math.floor(Math.random() * 4);
//     console.log(r);
//     GrafiekOptieArray[r]($scope.Activelesdata);

//       $scope.nextQ = function(){
//   	Qcounter++;
//   	GrafiekOptieArray[0]($scope.Activelesdata);
//   	console.log(Qcounter);
//   	if(Qcounter == $scope.Activelesdata.length){
//   		Qcounter = 0;
//   }
//   if ($scope.Activelesdata[Qcounter].Answer) {
//   	GrafiekOptieArray[2]($scope.Activelesdata);
//   }
// }

//   });


    var GrafiekOptieArray = [];
     var barGrafiek = function(data){
     	console.log(data[0]);

      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: $scope.Activelesdata[currentpos].Answer1,
            data: [data.Answer1],
            backgroundColor: "rgba(153,255,51,0.4)"
          }, {
            label: $scope.Activelesdata[currentpos].Answer2,
            data: [data.Answer2],
            backgroundColor: "rgba(255,153,0,0.4)"
          },{
            label: $scope.Activelesdata[currentpos].Answer3,
            data: [data.Answer3],
            backgroundColor:"rgba(0,153,255,0.4)"
          },{
            label: $scope.Activelesdata[currentpos].RightAnswer,
            data: [data.RightAnswer],
            backgroundColor:"rgba(153,0,255,0.4)"
          }]
        },
        options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          max: 20,
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

//     var lijnGrafiek = function(data){

//     var ctx = document.getElementById('myChart').getContext('2d');
//     var myChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
//     datasets: [{
//       label: 'apples',
//       data: [12, 19, 3, 17, 6, 3, 7],
//       backgroundColor: "rgba(153,255,51,0.4)"
//     }, {
//       label: 'oranges',
//       data: [2, 29, 5, 5, 2, 3, 10],
//       backgroundColor: "rgba(255,153,0,0.4)"
//     }]
//   }
// });

//   }


//   GrafiekOptieArray.push(lijnGrafiek);

  var pieGrafiek = function(data){
    var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["No", "Yes"],
    datasets: [{
      backgroundColor: [
        "red",
        "green"
      ],
      data: [data.Yes, data.No]
    }]
  }
});
  }

  GrafiekOptieArray.push(pieGrafiek);

//     var doughnutGrafiek = function(data){

//     var ctx = document.getElementById("myChart").getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: {
//     labels: ["M", "T", "W", "T", "F", "S", "S"],
//     datasets: [{
//       backgroundColor: [
//         "#2ecc71",
//         "#3498db",
//         "#95a5a6",
//         "#9b59b6",
//         "#f1c40f",
//         "#e74c3c",
//         "#34495e"
//       ],
//       data: [12, 19, 3, 17, 28, 24, 7]
//     }]
//   }
// });

//   }

//   GrafiekOptieArray.push(doughnutGrafiek);

//   // var r = Math.floor(Math.random() * 4);
//   // console.log(r);
//   // GrafiekOptieArray[r]();
});
