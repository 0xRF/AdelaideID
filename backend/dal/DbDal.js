const mysql = require('mysql');
const config = require('config');

var dal;
var pool = null;

function getConnection() {
    if (dal.Connected) {
        pool = mysql.createPool({
            connectionLimit: 100,
            host: config.has('db.host') ? config.get('db.host') : 'localhost',
            port: config.has('db.port') ? config.get('db.port') : '3306',
            database: 'dbAttendance',
            user: config.has('db.user') ? config.get('db.user') : '',
            passwod: config.has('db.password') ? config.get('db.port') : ''
        });
    }
    return pool;
}

dal.Connected = () => {
    return pool === null;
};

dal.GetAssignments = () => {
    var pool = getConnection();

    pool.query('SELECT * FROM Assignments', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
};

module.exports = dal;
