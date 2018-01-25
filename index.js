const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/api');


var app=express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds211558.mlab.com:11558/property-search');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(express.static(__dirname + "/public"));
app.use('/api',router);

app.use(function(err,req,res,next){
  //console.log(err);
  res.status(422).send({error:err.message});
});

app.listen(process.env.port||3010,function(err){
  if(err) throw err;
  console.log("connected");
});
