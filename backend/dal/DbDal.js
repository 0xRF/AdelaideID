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
            password: config.has('db.password') ? config.get('db.password') : ''
        });
    }
    return _pool;
}

module.exports.getAssignments = () => {
    let pool = getConnectionPool();
    var assignments = null;
    pool.getConnection((err, con) => {
        if (err) throw err;
        con.query('SELECT * FROM Assignments', (err, data, fields) => {
            con.release();
            if (err) throw err;
            assignments = data; //for some reason once it leaves the scope assignments re becomes null TODO
            console.log(assignments);
        });
    });
    return assignments;
};
