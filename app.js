const mysql = require('mysql');


const bodyParser = require('body-parser')
const express = require('express');
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!0on!0Admin"
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




