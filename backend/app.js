const express = require("express");
const session = require("express-session");
const axios = require("axios").default;
const canvas = require("./dal/CanvasDal.js");
const db = require("./dal/DbDal.js");
const bcrypt = require("bcrypt");
const fileUpload = require('express-fileupload');
const path = require("path");

const HASH_ROUNDS = 5;

const port = 8081;
const app = express();

app.use(express.json());

app.use(
    session({
        secret: "notsecure",
        resave: false,
        saveUninitialized: true
    }),
    fileUpload()
);

app.get("/api/session", (req, res) => {
    let result = {
        "session": req.sessionID,
        "authenticated": req.session.userId !== undefined
    }
    res.send(result);
})

app.post("/api/authenticate", async (req, res) => {
    try {
        let token = req.body.canvas_token;
        let userInfo = await canvas.getSelf(token);

        // Temporary storage (this will be moved into database once that is set up)
        req.session.canvasToken = token;
        req.session.userInfo = userInfo.data;
        console.log(userInfo.data)
        res.send(userInfo.data);
    } catch (e) {
        console.error(e)
        res.sendStatus(400);
    }
})

app.get("/api/student", async (req, res) => {
    try {
        let student = await db.getStudent(req.query.studentId);

        if (student == null) {
            res.sendStatus(404);
        }
        else {
            res.send(student);
        }

    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})

app.get("/api/courses", async (req, res) => {
    try {
        let user = await db.getUserById(req.session.userId);

        let courses = await canvas.getCourses(user.canvas_token);
        res.send(courses);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})



app.get("/api/self", async (req, res) => {
    try {
        let user = await db.getUserById(req.session.userId);
        let courses = await canvas.getSelf(user.canvas_token);
        res.send(courses);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})


app.get("/api/assignments", async (req, res) => {
    try {
        let user = await db.getUserById(req.session.userId);
        let assignments = await canvas.getAssignments(req.query.course_id, user.canvas_token);
        res.send(assignments);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})

app.post("/api/register", async (req, res) => {
    try {
        // get name based on student ID
        let token = req.body.canvas_token;
        let userInfo = await canvas.getSelf(token);

        let [last_name, first_name] = userInfo.sortable_name.split(", ");

        // hash password
        let hash = await bcrypt.hash(req.body.password, HASH_ROUNDS);

        let id = await db.addUser(first_name, last_name, req.body.username, token, hash);

        console.log(id);

        req.session.userId = id;
        res.sendStatus(200);

    } catch (e) {
        console.error(e);

        if (e.name == 'AlreadyExistsError') {
            res.status(409).send(e.message);
        }
        else {
            res.sendStatus(400);
        }
    }
})

app.post("/api/login", async (req, res) => {
    try {
        let user = await db.getUserByName(req.body.username);

        if (user == null) {
            throw { name: "InvalidCredentialsError", message: "Unable to login, credentials are invalid." };
        }

        let isCorrect = await bcrypt.compare(req.body.password, user.password_hash);

        if (!isCorrect) {
            throw { name: "InvalidCredentialsError", message: "Unable to login, credentials are invalid." };
        }

        req.session.userId = user.user_id;

        console.log("Login successful!");

        res.sendStatus(200);

    } catch (e) {
        console.error(e);

        if (e.name == 'InvalidCredentialsError') {
            res.status(400).send(e.message);
        }
        else {
            res.sendStatus(400);
        }
    }
})

app.get("/api/logout", (req, res) => {
    delete req.session.userId;
    res.sendStatus(200);
})

app.post("/api/mark", (req, res) => {
    // how tho
})

app.post("/api/partial", async (req, res) => {
    if (!req.files) {
        res.status(500).send("No files were uploaded.");
    }

    const file = req.files.file;
    const extension = file.mimetype.split('/')[1];
    const path = __dirname + "/files/" + file.md5 + '.' + extension;

    file.mv(path, (err) => {
        if (err) {
        console.log(path);
        console.log(err);
            res.sendStatus(500)
        }
    });
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
