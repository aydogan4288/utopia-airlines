var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});

module.exports = connection;

// host: "lms-rds.cmnn2qojb3cd.us-east-2.rds.amazonaws.com",
//  user: "root",
//  password: "rootroot",
//  database: "lms-rds"
