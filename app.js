const mysql = require('mysql');

const config = require('./config')

const bodyParser = require('body-parser')
const express = require('express');
const app = express();

var conn = mysql.createConnection({
  host: config.DatabaseConfig.database_host,
  user: config.DatabaseConfig.database_user,
  password: config.DatabaseConfig.database_pass,
  database: config.DatabaseConfig.database_name
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/saveData', function(req, res){
    res.send("Server is working");
    
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const emailId = req.body.email_id;
    const contactNumber = req.body.contact_num;
    const areaOfInterest = req.body.area_of_interest;

    const arr = req.body.mode_of_transport;
    const modeOfTransport = arr.toString(); 

    const message = req.body.message;
    const blogSub = req.body.blog_subscription;
    const marketingSub = req.body.marketing_subscription;

    const tableEntry = {
      firstName,lastName,emailId,contactNumber,areaOfInterest,modeOfTransport,message,blogSub,marketingSub
    }

    conn.query(`INSERT INTO leads_data SET ?`, tableEntry, (err, res) => {
      console.log("Error : "+ err );
      console.log("Success : "+ res );
    });
});


app.get('/fetchData', function(req, res){
  conn.query(`SELECT * FROM leads_data`,function (err, rows, fields) {

    if (err) {
        res.status(500).send({
            result: err
        });
    }
    else {
        res.status(200).send({
            result: rows
        });
    }
  });
});
app.listen(3000);




