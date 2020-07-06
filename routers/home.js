var express = require('express')
var router = express.Router();
var fs = require('fs');
var mysql = require('../config/database')();
var connection = mysql.init();
var ejs = require('ejs');

mysql.test_open(connection);

router.get('/',function(req,res,next){
    console.log("home routing ok");
    fs.readFile('./views/home.html','utf8',function(err,data){
        if(err){
            console.log('readFile error');
            console.log(err);
        }
        else{
            var sql = 'SELECT * FROM todo';
            connection.query(sql,function(err,rows,fields){
                if(err){
                    console.log(err);
                }
                else{
                   res.send(ejs.render(data,{
                        contentlist:rows
                   }));
                }
            });
        }
    })
});

router.get('/delete/?id=:id',function(req,res){
    var sql = "DELETE FROM todo WHERE idtodo = ?";

    connection.query(sql,[req.params.id],function(err,rows){
        if(err){
            console.log(err);
        }
        else{
            console.log("delete where idtodo = "+req.params.id);
            res.redirect('/home');
        }
    });
});

router.get('/update/?id=:id',function(req,res){
    var sql = "SELECT * FROM todo WHERE idtodo = ?";
    connection.query(sql,[req.params.id],function(err,rows){
        if(err){
            console.log(err);
        }
        else{
            if(rows.length > 0){
                res.render("update.html",
                    {
                        id : req.params.id,
                        title : rows[0].title,
                        content : rows[0].content
                    });
            }
        }
    })    
});

router.post('/update',function(req,res){
    var id = req.body.index;
    var sql = "UPDATE todo SET title = ?, content = ? WHERE idtodo = ?";
    connection.query(sql,[req.body.title,req.body.content,req.body.index],function(err,rows){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/home');
        }
    })
});

module.exports = router;