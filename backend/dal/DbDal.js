const mysql = require('mysql2/promise');
const config = require('config');

/** @type {mysql.Pool} */
var _pool = null;

function isConnected() {
    return !(_pool === null);
};

async function getConnection() {
    if (!isConnected()) {
        _pool = mysql.createPool({
            connectionLimit: 100,
            host: config.has('db.host') ? config.get('db.host') : 'localhost',
            port: config.has('db.port') ? config.get('db.port') : '3306',
            database: 'dbAttendance',
            user: config.has('db.user') ? config.get('db.user') : '',
            password: config.has('db.password') ? config.get('db.password') : ''
        });
    }
    return _pool.getConnection();
}

async function addAssignment(assignment_id, course_id) {
    let con = await getConnection();
    await con.query('INSERT INTO `Assignments` VALUES (?, ?);', [assignment_id, course_id]);
    console.log(`Inserted assignment ${assignment_id}, course ${course_id} into db`);
    con.release();
};


async function getAssignments() {
    let con = await getConnection();
    let [rows, _fields] = await con.query('SELECT * FROM Assignments');
    con.release();
    return rows;
};

async function addStudent(courseId, assignmentId, studentId, userId) {
    try {
        await addAssignment(assignmentId, courseId);
    } catch (err) {
        if (err.code != 'ER_DUP_ENTRY') throw err;
    }

    let con = await getConnection();
    await con.query('INSERT INTO Attendance_records (time_stamp, assignment_id, student_id, user_id) VALUES (now(), ?, ?, ?)', [assignmentId, studentId, userId]);
    console.log('Adding a students attendance');
    con.release();
};

module.exports = {
    addAssignment,
    getAssignments,
    addStudent
}
