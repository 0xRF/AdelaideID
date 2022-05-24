const config = require('config');
const axios = require("axios").default;

const CANVAS_ENDPOINT = "https://myuni.adelaide.edu.au/api/v1/";
const BEARER_TOKEN = config.has('canvas_token') ? config.get('canvas_token') : 'NULL';

console.log('Canvas Module Loaded');
console.log(`Bearer Token ${BEARER_TOKEN}`);


//TODO map or only return the fields we actually use or need
module.exports.getSelf = async () => {
    let userInfo = await axios.get(CANVAS_ENDPOINT + "users/self",
        {
            headers: {
                "Authorization": `Bearer ${BEARER_TOKEN}`
            }
        });
    return userInfo.data;
};

module.exports.getStudentInfo = async (student_id, course_id) => {
    let userInfo = await axios.get(`${CANVAS_ENDPOINT}courses/${course_id}/users/sis_user:${student_id}`,
        {
            headers: {
                "Authorization": `Bearer ${BEARER_TOKEN}`
            }
        });
    return userInfo.data;
};


module.exports.getCourses = async () => {
    let courses = await axios.get(CANVAS_ENDPOINT + "courses",
        {
            headers: {
                "Authorization": `Bearer ${BEARER_TOKEN}`
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

module.exports.getAssignments = async (course_id) => {
    let assignments = await axios.get(`${CANVAS_ENDPOINT}courses/${course_id}/assignments`,
        {
            headers: {
                "Authorization": `Bearer ${BEARER_TOKEN}`
            }
        });

    let sorted = assignments.data.sort((a, b) => {
        if (a.due_at === null)
            return false;
        return new Date(a.due_at) < new Date(b.due_at);
    });

    return sorted.map(v => ({
        id: v.id,
        name: v.name
    }))
};
