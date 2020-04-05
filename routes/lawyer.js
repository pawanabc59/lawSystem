var express = require('express')
var router = express.Router()
const http = require('http');
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
const mkdirp = require('mkdirp');
const NodeGeocoder = require('node-geocoder');
const QRCode = require('qrcode');
var MapboxClient = require('mapbox')
//var json2csv = require('json2csv');

 
// QRCode.toFile('C:/wamp/www/EventMania/files/quotation.png', 'Some text', {
//   color: {
//     dark: '#00F',  // Blue dots
//     light: '#0000' // Transparent background
//   }
// }, function (err) {
//   if (err) throw err
//   console.log('done')
// })

const con = require('../configuration/databaseConnection.js');
const database = require("../functions/lawyerQuery.js");
const mail = require('../functions/mail.js');
//const pdfObj = require('../functions/pdf.js');


const storage = multer.diskStorage({
	destination : function(req,file,cb){
		console.log("inside storage");
		var lawyerEmail = req.session.email;
		const dir = './public/uploads/lawyer/'+ lawyerEmail;
		mkdirp(dir, err => cb(null, dir));//+club+'/'+event
	},
	filename : function(req,file,cb){
		let temp = file.originalname;
		cb(null , temp)
	}
});

var upload = multer({ storage: storage })

// var client = new MapboxClient('pk.eyJ1IjoiZHluYW1vMjgxOCIsImEiOiJjanUxZ3prMmMwMWt0NGJwYXZpNDk5NXg4In0.M_GgSOEjSUkEFQI7PhR7Jw')

router.post('/register', function(req, res){
	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var contactNumber = req.body.contactNo;
	var email = req.body.email;
	var password = req.body.password;
	var hash = md5(password);
	var name = firstName+" "+lastName;

	var sql = "CREATE TABLE IF NOT EXISTS `lawyerReg` (`fname` varchar(50) NOT NULL, `lname` varchar(50) NOT NULL, `contactNo` varchar(50) NOT NULL, `email` varchar(100) NOT NULL PRIMARY KEY, `password` varchar(100) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;"
	con.query(sql, function(err, result){
		if (err) throw err;
    	// console.log("Table created");
    	database.lawyerRegistration(firstName, lastName, contactNumber, email, hash, function(err, result){
    		if (err) {
    			throw err;
    		}
    		mail.sendMail(name, password, email, "lawyer");
    		res.redirect("/home");
    	});
	});

});

router.get('/profile', function(req, res){
	res.render("lawyerProfile");
});

router.post('/profile',upload.array('lawyerImage',1), function(req,res){
	var email = req.session.email;
	var name = req.body.name;
	var address = req.body.address;
	var education = req.body.education;
	var speciality = req.body.speciality;
	var experience = req.body.experience;
	var fees = req.body.fees;
	var caseFought = req.body.caseFought;
	var caseWin = req.body.caseWin;
	var description = req.body.description;

	console.log(req.files);

	console.log("file 1 originalname "+req.files[0].originalname);

	var temp = req.files[0].destination.split('.');
	var path = temp[1]+'.'+temp[2];
	console.log("path 1 "+path);

	var path1 = path.split('/');
	var path2 = path1[2]+'/'+path1[3]+'/'+path1[4];

	var profilePic = '/'+path2+"/"+req.files[0].originalname;
	console.log("image "+profilePic);


	// var temp1 = req.files[1].destination.split('.')
	// var path2 = temp1[1]+'.'+temp1[2];
	// console.log("path 2 "+path2);

	var sql = "create table if not exists lawyerProfile (id int(100) not null auto_increment, email varchar(100) not null, name varchar(200) not null, address varchar(100) not null, education varchar(100) not null, speciality varchar(100) not null, experience varchar(100) not null, fees varchar(200) not null, caseFought varchar(1000) not null, caseWin varchar(1000) not null, description varchar(1000) not null, profilePic varchar(200) not null, PRIMARY KEY(id))";
	con.query(sql, function(err, result){
		if (err) {throw err;}

		database.lawyerProfile(email, name, address, education, speciality, experience, fees, caseFought, caseWin, description, profilePic, function(err, result){
			if (err) {throw err;}
			res.redirect("/home");
		});

	});

	// res.redirect("/home");
	
});

router.get('/notification', function(req, res){

	var sql = "select * from lawyerProfile where email = '"+req.session.email+"'";
	con.query(sql, function(err, results){
		if (err) throw err;
		results.forEach(function(result){
			var id = result.id;
			database.getNotification( id, function(err, results1){
				if (err) throw err;

				res.render("notification", {results1: results1});
			});

		});
		
	});
	// res.render("notification");
});

router.post('/approved', function(req,res){

	var victimEmail = req.body.emailApp;
	var victimName = req.body.nameApp;
	var fileLocation = req.body.casePDF;

	console.log("Case file location "+fileLocation);
	// var sql1 = "select * from addCase where email = '"+victimEmail+"'";
	// con.query(sql1, function(err, res){
	// 	if (err) throw err ;
	// 	res.forEach(function(re){

	// 		var ok = JSON.stringify(re);
	// 		console.log(re);
	// 		// var as = JSON.parse(ok);
	// 		console.log(ok);
	// 		fileLocation = re.casePDF;

	// 		// var temp_pass = JSON.stringify(re.casePDF);
	// 		// var temp2_pass= temp_pass.replace(/\"/g, "");

	// 		console.log("file location of pdf "+fileLocation);
	// 		console.log("sdfgh esdfghj dgfghj "+re.description);
	// 		// console.log("file location of pdf asdf aisdklfj "+re.casePDF);
	// 	});
	// });
	var sql = "select * from lawyerProfile where email = '"+req.session.email+"'";
	con.query(sql, function(err, results){
		if (err) throw err;
		results.forEach(function(result){
			// console.log("here the is the solution : ");
			// console.log(result);
			// console.log("id : "+ result.id);
			var id = result.id;
			var lawyerName = result.name;
			database.isApproved( id, victimEmail, function(err, results1){
				if (err) throw err;
				mail.approvedMail(victimName, victimEmail, lawyerName, fileLocation);
				mail.approvedMailLawyer(victimName, victimEmail, lawyerName, req.session.email, fileLocation);
				res.redirect("/lawyer/notification");
			});

		});
		
	});

});

router.post('/rejected', function(req,res){

	var victimEmail = req.body.emailRej;
	var victimName = req.body.nameRej;
	var reasonForRejection = req.body.reasonForRejection;
	var sql = "select * from lawyerProfile where email = '"+req.session.email+"'";
	con.query(sql, function(err, results){
		if (err) throw err;
		results.forEach(function(result){
			var id = result.id;
			var lawyerName = result.name;
			database.isRejected( id, victimEmail, function(err, results1){
				if (err) throw err;
				mail.rejectedMail(victimName, victimEmail, lawyerName, reasonForRejection);
				res.redirect("/lawyer/notification");
			});

		});
		
	});

});

router.get('/myCase', function(req, res){

	var sql = "select * from lawyerProfile where email = '"+req.session.email+"'";
	con.query(sql, function(err, results){
		if (err) throw err;
		results.forEach(function(result){
			var id = result.id;
			database.myCase( id, function(err, results1){
				if (err) throw err;

				res.render("lawyerMyCase", {results1: results1});
			});

		});
		
	});
	// res.render("notification");
});


// router.get('/addPlace', function(req, res){
// 	res.render("addPlace.ejs");
// });

// router.post('/addPlace',upload.array('placeImages',1), function(req,res){
// 	var email = req.session.email;
// 	var title = req.body.title;
// 	var address = req.body.address;
// 	var slots = req.body.slot;
// 	var startTime = req.body.arrivalTime;
// 	var endTime = req.body.closingTime;
// 	console.log(req.files);

// 	console.log("file 1 originalname "+req.files[0].originalname);

// 	var temp = req.files[0].destination.split('.');
// 	var path = temp[1]+'.'+temp[2];
// 	console.log("path 1 "+path);

// 	var path1 = path.split('/');
// 	var path2 = path1[2]+'/'+path1[3]+'/'+path1[4];

// 	var image = '/'+path2+"/"+req.files[0].originalname;
// 	console.log("image "+image);


// 	// var temp1 = req.files[1].destination.split('.')
// 	// var path2 = temp1[1]+'.'+temp1[2];
// 	// console.log("path 2 "+path2);

// 	var sql = "create table if not exists addPlace (email varchar(100) not null, title varchar(200) not null, address varchar(100) not null, slot int(100) not null, image varchar(200) not null, startTime varchar(50) not null, endTime varchar(50) not null)";
// 	con.query(sql, function(err, result){
// 		if (err) {throw err;}

// 		database.addPlace(email, title, address, slots, image, startTime, endTime, function(err, result){
// 			if (err) {throw err;}
// 			res.redirect("/home");
// 		});

// 	});

// 	// res.redirect("/home");
	
// });


// https://myaccount.google.com/

module.exports = router;