const mysql = require("mysql");

	var con = mysql.createConnection
	({
		host: "localhost",
	  	user: "root",
	  	password: "",
	  	database: "lawsystem"

	});

	// con.query("CREATE DATABASE IF NOT EXISTS lawsystem", function (err, result) {
 //    if (err) throw err;
 //    console.log("Database created");
 //  });

   con.connect(function(err){
      if (err) throw err;
      console.log("Connected!");
   });

//    con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE IF NOT EXISTS lawsystem", function (err, result) {
//     if (err) throw err;
//     con.query("use lawsystem", function(err,result){
//     	console.log("Database created");
//     });
//     // console.log("Database created");
//   });
// });

module.exports= con ; 