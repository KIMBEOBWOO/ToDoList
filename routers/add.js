var express = require('express');
var router = express.Router();
var mysql = require('../config/database')();

var connection = mysql.init();
mysql.test_open(connection);

router.get('/',function(req,res,next){
    console.log("add routing ok");
    res.render('add.html');
})

router.post('/add',function(req,res,next){
    //console.log("add post ok");
    //console.log("title : "+req.body.title);
    //console.log("content : "+req.body.content);

    var sql = 'INSERT INTO todo(title,content) VALUES(?,?)';
    var params = [req.body.title,req.body.content];

    connection.query(sql,params,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        else{
            console.log("insert ok");
            res.redirect('/home');
        }
    });

})

module.exports = router;
