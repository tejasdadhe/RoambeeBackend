const mysql = require('mysql');

const config = require('./config')

const bodyParser = require('body-parser')
const express = require('express');
const app = express();

var con = mysql.createConnection({
  host: config.DatabaseConfig.database_name,
  user: config.DatabaseConfig.database_user,
  password: config.DatabaseConfig.database_pass
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use(bodyParser.json());

app.post('/saveData', function(req, res){
    res.send("Server is working");
    console.dir(req.body);
});

app.listen(3000);




