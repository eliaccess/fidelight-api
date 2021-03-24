const mysql = require('mysql');

const con = new mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fidelight' 
});


con.connect(function(err) {
     if (err) throw err;
});

module.exports = con;
