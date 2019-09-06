const con = require('../configuration/databaseConnection.js');
const md5 = require('md5');

function userRegistration(firstName, lastName, contactNo, email, password,cb){
	
	var sql = "insert into userReg (fname, lname, contactNo, email, password) values ('"+firstName+"','"+lastName+"','"+contactNo+"','"+email+"','"+password+"')";
	con.query(sql, function(err, result){
		cb(err, result);
	});

}

function addCase(email, title, victimName, description, casepdf, file, lawyerId, cb){
	var sql = "insert into addCase(email, title, victimName, description, casepdf, file, lawyerId, isRejected, isApproved) values('"+email+"','"+title+"','"+victimName+"','"+description+"','"+casepdf+"','"+file+"','"+lawyerId+"', 0, 0)";
	con.query(sql, function(err, result){
		cb(err, result);
	});
}

// function viewPlaces(cb){

// 	var sql = "select * from addPlace";
// 	con.query(sql, function(err, result){
// 		cb(err, result);
// 	});
// }

// function bookPlace(email, title, place, arrivalTime, departureTime, cb){

// 	var sql = "insert into bookedPlace values ('"+email+"', '"+title+"', '"+place+"', '"+arrivalTime+"', '"+departureTime+"')";
// 	con.query(sql, function(err, result){
// 		cb(err, result);
// 	});

// }

// function decrementSlots(title, cb){

// 	var sql = "UPDATE `addPlace` SET `slotsLeft`= `slotsLeft` - 1 WHERE title = '"+title+"' and `slotsLeft` > 0";
// 	con.query(sql, function(err, result){
// 		cb(err, result);
// 	});

// }

module.exports = { userRegistration , addCase}
