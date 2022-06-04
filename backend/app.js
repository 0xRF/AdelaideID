const express = require("express");
const session = require("express-session");
const axios = require("axios").default;
const canvas = require("./dal/CanvasDal.js");
const db = require("./dal/DbDal.js");

const port = 8081;
const app = express();

app.use(express.json());

app.use(session({
    secret: "notsecure",
    resave: false,
    saveUninitialized: true
}));

app.get("/api/session", (req, res) => {
    let result = {
        "session": req.sessionID,
        "authenticated": req.session.canvasToken !== undefined
    }
    res.send(result);
})

app.post("/api/authenticate", async (req, res) => {
    try {
        let token = req.body.canvas_token;
        console.log(req.body);
        let userInfo = await canvas.getSelf();

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
        let student = await canvas.getStudentInfo(req.query.studentId, req.query.courseId);
        res.send(student);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})


app.get("/api/self", async (req, res) => {
    try {
        let courses = await canvas.getSelf();
        res.send(courses);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})


app.get("/api/courses", async (req, res) => {
    try {
        let courses = await canvas.getCourses();
        res.send(courses);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})



app.get("/api/self", async (req, res) => {
    try {
        let courses = await canvas.getSelf();
        res.send(courses);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})


app.get("/api/assignments", async (req, res) => {
    try {
        let assignments = await db.getAssignments();
        res.send(assignments);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
