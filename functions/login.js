const con = require('../configuration/databaseConnection.js');
const md5 = require('md5');

function lawyerLogin(email,hash,cb){

	  		var sql = "select password from lawyerReg where email='"+email+"';";
			con.query(sql,function(err,result,fields){
			cb(err,result);
			});
}

function userLogin(email,hash,cb){

	  		var sql = "select password from userReg where email='"+email+"';";
			con.query(sql,function(err,result,fields){
			cb(err,result);
			});
}

module.exports = { lawyerLogin , userLogin }
