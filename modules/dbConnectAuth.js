const mysql = require('mysql');

const con2 = new mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fidelightAuth' 
});

con2.connect(function(err) {
     if (err) throw err;
});

module.exports = con2;