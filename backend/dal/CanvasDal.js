const config = require('config');
const axios = require("axios").default;

const CANVAS_ENDPOINT = "https://myuni.adelaide.edu.au/api/v1/";

console.log('Canvas Module Loaded');

//TODO map or only return the fields we actually use or need
async function getSelf(bearer_token) {
    let userInfo = await axios.get(CANVAS_ENDPOINT + "users/self",
        {
            headers: {
                "Authorization": `Bearer ${bearer_token}`
            }
        });
    return userInfo.data;
};

async function getStudentInfo(bearer_token, student_id, course_id) {
    let userInfo = await axios.get(`${CANVAS_ENDPOINT}courses/${course_id}/users/sis_user_id:${student_id}`,
        {
            headers: {
                "Authorization": `Bearer ${bearer_token}`
            }
        });
    return userInfo.data;
};


async function getCourses(bearer_token) {
    let courses = await axios.get(CANVAS_ENDPOINT + "courses",
        {
            headers: {
                "Authorization": `Bearer ${bearer_token}`
            }
        });

    let filtered = courses.data.filter(course => {
        if (!course.enrollments)
            return false
        return course.enrollments.some(en => en.type == "teacher")
    });

    return filtered.map(v => ({
        id: v.id,
        name: v.name,
        course_code: v.course_code
    }))
};

async function getAssignments(course_id, bearer_token) {
    let assignments = await axios.get(`${CANVAS_ENDPOINT}courses/${course_id}/assignments`,
        {
            headers: {
                "Authorization": `Bearer ${bearer_token}`
            }
        });

    let sorted = assignments.data.sort((a, b) => {
        if (a.due_at === null)
            return false;
        return new Date(a.due_at) < new Date(b.due_at);
    });

    return sorted.map(v => ({
        id: v.id,
        name: v.name,
        due_at: v.due_at,
    }))
};

module.exports = {
    getSelf,
    getStudentInfo,
    getCourses,
    getAssignments
}
