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


function addAssignment(assignment_id, course_id) {
    let pool = getConnectionPool();
    pool.getConnection((err, con) => {
        if (err) throw err;
        con.query('SELECT COUNT(*) FROM Assignments WHERE assignment_id = ?', [assignment_id], (err, data, fields) => {
            if (err) throw err;
            if (data[0] == 0) {
                con.query('INSERT INTO `Assignments` VALUES (?, ?);', [assignment_id, course_id], (err, res) => {
                    if (err) throw err;
                    console.log(`Inserted assignment ${assignment_id}, course ${course_id} into db`);
                });
            }
            con.release();
        });
    });
};

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

module.exports.addStudent = (courseId, assignmentId, studentId, userId, timeStamp) => {
    let pool = getConnectionPool();

    addAssignment(assignmentId, courseId);

    pool.getConnection((err, con) => {
        if (err) throw err;
        con.query('SELECT COUNT(*) FROM Attendance_records WHERE assignment_id = ? AND student_id = ?', [assignmentId, studentId], (err, data, fields) => {
            if (data[0] == 0) {
                con.query('INSERT INTO Attendance_records VALUES (?, ?, ?, ?)', [timeStamp, assignmentId, studentId, userId], data, fields], (err, res) => {
                    if (err) throw err;
                    console.log('Adding a students attendance');
                    con.release();
                });
            }
            else
                console.log('this student has already been added...');
        });
    });
};

