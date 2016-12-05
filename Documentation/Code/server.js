var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var passport = require('passport');
// var mongojs = require('mongojs');
// var dbusers = mongojs('jarfish', ['users']);
// var dbMultipleChoiceLessen = mongojs('jarfish', ['MultipleChoiceLessen']);
// var dbYesNoLessen = mongojs('jarfish', ['YesNoLessen']);
var mongo = require('mongodb').MongoClient;
var assert =require('assert');
var session = require('express-session');
var nodemailer = require("nodemailer");
var _ = require("underscore");

var app = express();

var url = 'mongodb://localhost:27017/jarfish';
var originalData;

// var nav = [{
//     Link: '/Lessen',
//     Text: 'Playbooks'
// }, {
//     Link: '/Profile',
//     Text: 'Profile'
// }];

// var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({secret: 'supersecret',
//                 resave: false,
//                 saveUninitialized: true,
//                 cookie: { secure: true }}));

require('./src/config/passport')(app);

app.use(express.static('public'));
app.use(express.static('src/views'));

// app.use('/Auth', authRouter);


// // passport.use(new LocalStrategy(
// //   function(username, password, done) {
// //     User.findOne({ username: username }, function(err, user) {
// //       if (err) { return done(err); }
// //       if (!user) {
// //         return done(null, false, { message: 'Incorrect username.' });
// //       }
// //       if (!user.validPassword(password)) {
// //         return done(null, false, { message: 'Incorrect password.' });
// //       }
// //       return done(null, user);
// //     });
// //   }
// // ));


//Empty Array for UserData
var Data = [];

//Config SMTP Server
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "plategate07@gmail.com",
        pass: "platenfabriek"
    }
});


// // app.get("/", function (req, res) {
// //     res.sendFile(path.join(__dirname,'./index.html'));

// // });


// // app.get("/guestinfo", function (req, res) {
// // 	console.log("Got Request");
// //     res.sendFile('guestinfo.html', { root: __dirname });
// // });

//Post for Db
app.post("/MultipleChoiceLessen",function(req,res){

	var multiplechoiceles = {
    Coursename: req.body.Coursename,
    Question: req.body.Question,
    Answer1: req.body.Antwoord1,
    Answer2: req.body.Antwoord2,
    Answer3: req.body.Antwoord3,
    RightAnswer: req.body.RightAnswer
    };

  console.log(multiplechoiceles);

  mongo.connect(url, function(err, db) {
  	assert.equal(null,err);
    db.collection('MultipleChoiceLessen').insertOne(multiplechoiceles, function(err, result) {
      assert.equal(null,err);
      console.log('Item inserted');
      db.close();
    });
  });
});


app.post("/YesNoLessen",function(req,res){

	var yesnoles = {
    Coursename: req.body.Coursename,
    Question: req.body.Question,
    Answer: req.body.Answer.value,
  };

  console.log(yesnoles);

  mongo.connect(url, function(err, db) {
  	assert.equal(null,err);
    db.collection('YesNoLessen').insertOne(yesnoles, function(err, result) {
      assert.equal(null,err);
      console.log('Item inserted');
      db.close();
    });
  });

});


app.get("/GetLessen", function(req, res){
  console.log("Got request");
  console.log("this is a small git test");
	var results = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		var cursor = db.collection('MultipleChoiceLessen').find();
		cursor.forEach(function(doc, err){
			assert.equal(null, err);
			results.push(doc);
		},function(){
			db.close();
		});
	});

	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		var cursor = db.collection('YesNoLessen').find();
		cursor.forEach(function(doc, err){
			assert.equal(null, err);
			results.push(doc);
		},function(){
			db.close();
			res.json(results);
      originalData = results;
		});
	});

});



app.post("/Vragen", function (req,res) {
    var Vragen = req.body.vak;
    var filtered = _.where(originalData, { Coursename: Vragen });
    res.json(filtered);

});

app.delete("/deleteLes", function(req, res){

})

var filteredData = [];

//Krijg Course aan, laat eerstre vraag zien en dan volgende enz...
app.post("/ActivateLessen", function(req, res){
    var results = [];
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('MultipleChoiceLessen').find();
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      results.push(doc);
    },function(){
      db.close();
    });
  });

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('YesNoLessen').find();
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      results.push(doc);
    },function(){
      db.close();
      originalData = results;
      console.log(req.body.CourseName);
      var Vragen = req.body.CourseName;
      var filtered = _.where(originalData, { Coursename: Vragen });

      filteredData = filtered;
      //res.json(filtered);
      console.log(filtered);
    });
  });
});

app.post("/Results", function(req,res){
  console.log(req.body);
  res.json(req.body);
})

app.get('/dataFilter', function(req, res){
  res.json(filteredData);
})

app.post('/addCourse', function(req, res){
  console.log(req.body);
    mongo.connect(url, function(err, db) {
    assert.equal(null,err);
    db.collection('rogueCourses').insertOne(req.body, function(err, result) {
      assert.equal(null,err);
      console.log('Item inserted');
      db.close();
    });
  });
})
//  app.post('/Register', function(req, res){
//  	console.log(req.body);
//  	dbaccount.accountstorage.insert(req.body,function(err,doc){

//  	    var mailOptions = {
// 		from : 'plategate07@gmail.com',
// 		to : req.body.Email,
// 		subject : "Account Registration" ,
// 		text :  "Hello Tere, your account with Username : " + req.body.Username + " " + "Has been created. Pease Use this to login from now on."
// 	}

// 	console.log(mailOptions);

// 	smtpTransport.sendMail(mailOptions, function(error, response){
// 		if(error){
//             console.log(error);
//         res.end("error");
//         }else{
//             console.log("Message sent: " + response.message);
//         res.end("sent");
//         }
// 	});
//  	});

//  })


// // app.post("/Login", function(req, res){
// // 	// dbaccount.accountstorage.find({}).toArray(function(err,doc){
// // 	// 	console.log(doc[0].username);
// // 	// 	if (req.body.Username == doc[0].username && req.body.Password == doc[0].password ) {
// // 	// 		console.log("YAAAAAAA");
// // 	// 		var Approved = true;
// // 	// 		res.json(Approved);

// // 	// 	}
// // 	// });
// // 	req.login(req.body, function(){
// // 		console.log(req.body);
// // 		//res.redirect('/GetLessen');
// // 	})
// // });

// // app.post('/login',
// //   passport.authenticate('local', { successRedirect: '/GetLessen',
// //                                    failureRedirect: '/',
// //                                    failureFlash: true })
// // );


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, function (err) {
    console.log('running server on port 3000');
});
