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

async function getCourseByAssignmentId(assigmentId) {
    let con = await getConnection();
    let [rows, _fields] = await con.query('SELECT * FROM Assignments WHERE assignment_id = ?', [assignmentId]);
    con.release();
    return rows[0].course_id;
};



async function getStudent(studentId) {
    let con = await getConnection();
    let [rows, _fields] = await con.query('SELECT * FROM Students WHERE student_id = ?', [studentId]);
    con.release();
    return rows[0];
};

async function markStudent(assignmentId, studentId, userId) {
    let con = await getConnection();
    await con.query('INSERT INTO Attendance_records (time_stamp, assignment_id, student_id, user_id) VALUES (now(), ?, ?, ?)', [assignmentId, studentId, userId]);
    console.log('Adding a students attendance');
    con.release();
};


async function addFollowUp(assignmentId, userId, firstName, lastName, studentId, filePath) {
    console.log(assignmentId);
    console.log(userId);
    console.log(firstName);
    console.log(lastName);
    console.log(studentId);
    console.log(filePath);

    let con = await getConnection();
    await con.query('INSERT INTO Follow_ups (unverified_student_id, first_name, last_name, path_to_image, time_stamp, assignment_id, user_id) VALUES (?, ?, ?, ?, now(), ?, ?)',
                                            [studentId,             firstName,  lastName,  filePath,                  assignmentId, userId]);
    console.log('Adding a students follow up attendanace');
    con.release();
};



async function addUser(firstName, lastName, username, bearerToken, passwordHash) {
    // check if user exists
    let con = await getConnection();
    let [rows, _fields] = await con.query('SELECT * FROM Users WHERE username = ?', [username]);


    if (rows.length != 0) {
        console.log('Unable to register, user already exists');
        con.release();

        throw { name: "AlreadyExistsError", message: "Unable to register, user already exists." };
    }

    await con.query('INSERT INTO Users (first_name, last_name, username, canvas_token, password_hash) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, username, bearerToken, passwordHash]);
    console.log('Registering a new user');

    let id;
    [id, _fields] = await con.query('SELECT user_id FROM Users WHERE username = ?', [username]);

    con.release();

    return id[0];
};

async function getUserById(user_id) {
    let con = await getConnection();
    let [rows, _fields] = await con.query('SELECT * FROM Users WHERE user_id = ?', [user_id]);
    con.release();
    return rows[0];
};

async function getUserByName(username) {
    let con = await getConnection();
    let [rows, _fields] = await con.query('SELECT * FROM Users WHERE username = ?', [username]);
    con.release();
    return rows[0];
};

module.exports = {
    addAssignment,
    getAssignments,
    markStudent,
    getStudent,
    addUser,
    getUserById,
    getUserByName,
    addFollowUp,
    getCourseByAssignmentId
}
