const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql");
const session = require('express-session');
const md5 = require('md5');
const multer = require('multer');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const assert = require('assert');
const csv=require('csvtojson');
const PDFDocument = require('pdfkit');
const fs = require('fs');



let uploadData = multer();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));


//functions
//const mail = require('./functions/mail.js');
const con = require('./configuration/databaseConnection.js');


//setting the template engine
app.set('view engine','ejs');

//session maintaining
app.use(session({secret:'noneed', resave: false, saveUninitialized: true}));

// by using locals we can access the session variable anywhere in the templates.
app.use(function(req, res, next){
	res.locals.email = req.session.email;
	res.locals.roles = req.session.roles;
	// res.locals.roles = req.session.userId;
	res.locals.status = "400";
	next();
});



//AJAX
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req,res){
	res.send('<div class="alert alert-success alert-dismissible"> <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Success!</strong> Indicates a successful or positive action.</div>');
});


// //router
const user = require('./routes/user.js');
const lawyer = require('./routes/lawyer.js');
// const donar = require('./routes/donar.js');
const database = require("./functions/login.js");
const userQuery = require("./functions/userQuery.js");

app.use('/user',user);
app.use('/lawyer',lawyer);
// app.use('/donar',donar);

app.get('/home',(req,res)=>{

	console.log("inside");
	if (req.session.email) {
		console.log(req.session.email);
		console.log("in session");
		res.render("home", {email: req.session.email, roles: req.session.roles});

	}
	else{
		res.render("home");
	}
});

// app.get('/viewPlace',(req,res)=>{

// 	console.log("inside");
// 	if (req.session.email) {
// 		console.log(req.session.email);
// 		console.log("in session");
// 		userQuery.viewPlaces(function(err, results){
// 			if (err) throw err;
// 			res.render("viewPlace", {results: results , email: req.session.email, roles: req.session.roles});
// 		});

// 	}
// 	else{
// 		console.log("out session");
// 		userQuery.viewPlaces(function(err, results){
// 			if (err) throw err;
// 			res.render("viewPlace", {results: results , email: req.session.email, roles: req.session.roles});
// 		});
// 		// res.render("home");
// 	}
// });

app.get('/login', function(req,res){
	res.render("login");
});

app.post('/login', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	var hash = md5(password);
	var optradio = req.body.optradio;

	if (optradio == "user") {
		database.userLogin(email, hash, function(err, result){
			if (err) {throw err;}
			if (result.length == 1) {
				var temp_pass = JSON.stringify(result[0].password);
				var temp2_pass = temp_pass.replace(/\"/g, "");

				if (hash == temp2_pass) {
					req.session.email = req.body.email;
					req.session.roles = "user";
					console.log("Correct password")
					res.redirect("/home");
				}
				else{
					console.log("Incorrect password");
					res.render("login");
				}
			}
			else{
				console.log("username not found");
				res.render("login");	
			}
		});
	}
	if (optradio == "lawyer") {
		database.lawyerLogin(email, hash, function(err, result){
			if (err) {throw err;}
			if (result.length == 1) {
				var temp_pass = JSON.stringify(result[0].password);
				var temp2_pass = temp_pass.replace(/\"/g, "");

				if (hash == temp2_pass) {
					req.session.email = req.body.email;
					req.session.roles = "lawyer";
					console.log("Correct password")
					res.redirect("/home");
				}
				else{
					console.log("Incorrect password");
					res.render("login");
				}
			}
			else{
				console.log("username not found");
				res.render("login");	
			}
		});
	}
});

app.get('/logout',function(req,res){    
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.redirect('/login');  
        }  
    });  

});


app.get('/lawyer', function(req, res){

	sql = "select * from lawyerProfile";
	con.query(sql, function(err, results){
		if (err) throw err;
		console.log(results);
		res.render("lawyer", {results: results});
	});
	// res.render("lawyer");
});

app.get('/laws', function(req, res){
	res.render("laws");
});

app.listen(8050);