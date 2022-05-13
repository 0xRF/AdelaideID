const express = require("express");
const session = require("express-session");
const axios = require("axios").default;

const CANVAS_ENDPOINT = "https://myuni.adelaide.edu.au/api/v1/";

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
        let userInfo = await axios.get(CANVAS_ENDPOINT + "users/self",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
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

app.get("/api/courses", async (req, res) => {
    try {
        let courses = await axios.get(CANVAS_ENDPOINT + "courses",
            {
                headers: {
                    "Authorization": `Bearer ${req.session.canvasToken}`
                }
            });

        let filtered = courses.data.filter(course => {
            if (!course.enrollments)
                return false
            return course.enrollments.some(en => en.type == "teacher")
        });
        let result = filtered.map(v => ({
            id: v.id,
            name: v.name,
            course_code: v.course_code
        }))
        res.send(result);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
