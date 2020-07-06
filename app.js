const express = require("express");
const app = express();
const PORT = 3000;

var bodyparser = require('body-parser');
var fs = require('fs');

// view engine setting
app.set('view engine','ejs');   
app.engine('html',require('ejs').renderFile);

// view path setting
app.set('views',__dirname+"/views");

app.listen(PORT, ()=>{
    console.log("App is Listening on port 3000");
})

// body-parser setting for urlencoded and json
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

// router setting
var addRouter = require('./routers/add');
var homeRouter = require('./routers/home');

app.use('/',addRouter);
app.use('/home',homeRouter);

module.exports = app;