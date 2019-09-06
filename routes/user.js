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

const con = require('../configuration/databaseConnection.js');
const database = require("../functions/userQuery.js");
const mail = require('../functions/mail.js');
// const pdfObj = require('../functions/pdf.js');


// const storage = multer.diskStorage({
// 	destination : function(req,file,cb){
// 		console.log("inside storage");
// 		var email = req.body.email;
// 		const dir = './uploads/volunteer/'+email;
// 		mkdirp(dir, err => cb(null, dir));
// 	},
// 	filename : function(req,file,cb){
// 		let temp = file.originalname;
// 		cb(null , temp)
// 	}
// });

// var upload = multer({ storage: storage })


const storage = multer.diskStorage({
	destination : function(req,file,cb){
		console.log("inside storage");
		var userEmail = req.session.email;
		const dir = './public/uploads/user/'+ userEmail;
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

	var sql = "CREATE TABLE IF NOT EXISTS `userReg` (`fname` varchar(50) NOT NULL, `lname` varchar(50) NOT NULL, `contactNo` varchar(50) NOT NULL, `email` varchar(100) NOT NULL PRIMARY KEY, `password` varchar(100) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;"
	con.query(sql, function(err, result){
		if (err) throw err;
    	// console.log("Table created");
    	database.userRegistration(firstName, lastName, contactNumber, email, hash, function(err, result){
    		if (err) throw err;
    		mail.sendMail(name, password, email, "User")
    		res.redirect("/home");
    	});
	});

});

router.get('/addCase', function(req, res){
	res.render("addCase");
});


router.post('/addCase',upload.array('casepdf',1), function(req,res){
	var email = req.session.email;
	var title = req.body.title;
	var victimName = req.body.victimName;
	var description = req.body.description;
	var lawyerId = req.body.lawyerId;
	console.log(req.files);

	console.log("file 1 originalname "+req.files[0].originalname);

	var temp = req.files[0].destination.split('.');
	var path = temp[1]+'.'+temp[2];
	console.log("path 1 "+path);

	var path1 = path.split('/');
	var path2 = path1[2]+'/'+path1[3]+'/'+path1[4];

	var casepdf = '/'+path2+"/"+req.files[0].originalname;
	var file = req.files[0].originalname;
	console.log("image "+casepdf);


	// var temp1 = req.files[1].destination.split('.')
	// var path2 = temp1[1]+'.'+temp1[2];
	// console.log("path 2 "+path2);

	var sql = "create table if not exists addCase (id int(100) not null auto_increment, email varchar(100) not null, title varchar(200) not null, victimName varchar(100) not null, description varchar(1000) not null, casepdf varchar(200) not null, file varchar(200) not null, lawyerId int(100) not null, isRejected int(10) not null, isApproved int(10) not null, PRIMARY KEY(id))";
	con.query(sql, function(err, result){
		if (err) {throw err;}

		database.addCase(email, title, victimName, description, casepdf, file, lawyerId, function(err, result){
			if (err) {throw err;}
			res.redirect("/home");
		});

	});

	// res.redirect("/home");
	
});

// router.post('/event_register',(req,res)=>{

// 	var email = req.session.email;
// 	var eventId = req.body.eventId;
// 	console.log("from app "+eventId);

// 	database.event_register(email,eventId,function(err,result){
// 		if (err){ 
// 			throw err;
// 	    }
// 	    else{

// 	    	mail.sendTicket(name,eventName,email,attachment,function(error,info){

// 	    		if(err) throw err;
// 	    		console.log("ticket has been mailed");
// 	    		res.redirect("/myEvents");
// 	    	});

// 	    }
// 	});

// });







//Get the co-ordinates of all the events
// router.post('/getCoords',(req,res)=>{

// 	var eventId = req.body.eventId;
// 	console.log("from app "+eventId);
// 	database.getCoords(eventId,function(err,result){
// 		if (err){ 
// 			throw err;
// 	    }
// 	    else{
// 	    	console.log(JSON.stringify(result));
// 	    	res.send(JSON.stringify(result));
// 	    }
// 	});
// });

module.exports = router;