var express = require('express');
var app = express();
var mongojs = require('mongojs');
var passport = require('passport');
var dblesstorage = mongojs('lesstorage', ['lesstorage']);
var dbaccount = mongojs('accountstorage', ['accountstorage']);
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var session = require('express-session');
var cookieParser = require('cookie-parser');
//var sql = require('mssql');


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret: 'supersecret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});


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


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname,'./index.html'));

});


// app.get("/guestinfo", function (req, res) {
// 	console.log("Got Request");
//     res.sendFile('guestinfo.html', { root: __dirname });
// });

//Post for Db
app.post("/Storage",function(req,res){

	//Adding the Userdata to the DB
	Data.push(req.body);
	dblesstorage.lesstorage.insert(Data,function(err, doc){
		res.json(doc);
		console.log(doc);
		//Data = [];
	})

});

app.get("/GetLessen", function(req, res){
	console.log("Got Request");
	dblesstorage.lesstorage.find(function(err,doc){
		res.json(doc);
	});
});

 app.post('/Register', function(req, res){
 	console.log(req.body);
 	dbaccount.accountstorage.insert(req.body,function(err,doc){

 	    var mailOptions = {
		from : 'plategate07@gmail.com',
		to : req.body.Email,
		subject : "Account Registration" ,
		text :  "Hello Tere, your account with Username : " + req.body.Username + " " + "Has been created. Pease Use this to login from now on."
	}

	console.log(mailOptions);

	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
            console.log(error);
        res.end("error");
        }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
        }
	});
 	});

 })


app.post("/Login", function(req, res){
	dbaccount.accountstorage.find({}).toArray(function(err,doc){
		console.log(doc[0].username);
		if (req.body.Username == doc[0].username && req.body.Password == doc[0].password ) {
			console.log("YAAAAAAA");
			var Approved = true;
			res.json(Approved);

		}
	});
});




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000);
console.log("Server running on port 3000");
