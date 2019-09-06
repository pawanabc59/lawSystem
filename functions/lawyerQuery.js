const con = require('../configuration/databaseConnection.js');
const md5 = require('md5');

function lawyerRegistration(firstName, lastName, contactNo, email, password,cb){
	
	var sql = "insert into lawyerReg (fname, lname, contactNo, email, password) values ('"+firstName+"','"+lastName+"','"+contactNo+"','"+email+"','"+password+"')";
	con.query(sql, function(err, result){
		cb(err, result);
	});

}

function lawyerProfile(email, name, address, education, speciality, experience, fees, caseFought, caseWin,description, profilePic, cb){
	var sql = "insert into lawyerProfile(email, name, address, education, speciality, experience, fees, caseFought, caseWin, description, profilePic) values('"+email+"','"+name+"','"+address+"','"+education+"','"+speciality+"','"+experience+"','"+fees+"','"+caseFought+"','"+caseWin+"','"+description+"','"+profilePic+"') on duplicate key update email = '"+email+"', name = '"+name+"', address = '"+address+"', education = '"+education+"', speciality = '"+speciality+"', experience = '"+experience+"', fees = '"+fees+"', caseFought = '"+caseFought+"', caseWin = '"+caseWin+"', description = '"+description+"', profilePic = '"+profilePic+"'";
	con.query(sql, function(err, result){
		cb(err, result);
	});
}

function getNotification(id, cb){

	var sql = "select * from addCase where lawyerId = '"+id+"' and isRejected = 0 and isApproved = 0";
	con.query(sql, function(err, result){
		cb(err, result);
	});

}

function isApproved(id, email, cb){

	var sql = "update addCase set isApproved = 1 where lawyerId = '"+id+"' and email = '"+email+"'";
	con.query(sql, function(err, result){
		cb(err, result);
	});

}

function isRejected(id, email, cb){

	var sql = "update addCase set isRejected = 1 where lawyerId = '"+id+"' and email = '"+email+"'";
	con.query(sql, function(err, result){
		cb(err, result);
	});

}

function myCase(id, cb){

	var sql = "select * from addCase where lawyerId = '"+id+"' and isApproved = 1";
	con.query(sql, function(err, result){
		cb(err, result);
	});

}

module.exports = { lawyerRegistration , lawyerProfile , getNotification , isApproved , isRejected , myCase }
