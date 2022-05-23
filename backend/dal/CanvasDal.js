const config = require('config');
const axios = require("axios").default;

const CANVAS_ENDPOINT = "https://myuni.adelaide.edu.au/api/v1/";
const BEARER_TOKEN = config.has('canvas_token') ? config.get('canvas_token') : 'NULL';

console.log('Canvas Module Loaded');
console.log(`Bearer Token ${BEARER_TOKEN}`);

module.exports.getSelf = async () => {
    return userInfo = await axios.get(CANVAS_ENDPOINT + "users/self",
        {
            headers: {
                "Authorization": `Bearer ${BEARER_TOKEN}`
            }
        });
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

    return result = filtered.map(v => ({
        id: v.id,
        name: v.name,
        course_code: v.course_code
    }))
};
