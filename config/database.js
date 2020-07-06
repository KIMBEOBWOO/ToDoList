var mysql = require('mysql');

module.exports = function(){
    return {
        // init function createConnection , 밑에 정보는 local mysql 내 정보
        init: function () {
          return mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'wjdrms15!',
            database: 'todo'
          })
        },
        
        // test open 을 사용함으로 mysql connection error check
        test_open: function (con) {
          con.connect(function (err) {
            if (err) {
              console.error('mysql connection error :' + err);
            } else {
              console.info('mysql is connected successfully.');
            }
          })
        }
      }
};