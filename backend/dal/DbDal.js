const mysql = require('mysql');
const config = require('config');

var _pool = null;

module.exports.connected = () => {
    return !(_pool === null);
};

function getConnectionPool() {
    if (!module.exports.connected()) {
        _pool = mysql.createPool({
            connectionLimit: 100,
            host: config.has('db.host') ? config.get('db.host') : 'localhost',
            port: config.has('db.port') ? config.get('db.port') : '3306',
            database: 'dbAttendance',
            user: config.has('db.user') ? config.get('db.user') : '',
            password: config.has('db.password') ? config.get('db.port') : ''
        });
    }
    return _pool;
}


module.exports.getAssignments = () => {
    let pool = getConnectionPool();
    console.log('a');
    pool.getConnection((err, con) => {
        con.release();
        console.log('did we make it this far?: ' + err);
        con.query('SELECT * FROM Assignments', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        });
    });
};

