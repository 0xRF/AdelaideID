<script setup>
import { ref } from "vue";
import ConfirmationPopup from "../components/ConfirmationPopup.vue";
import ClassCard from "../components/ClassCard.vue";
import StudentCard from "../components/StudentCard.vue";

const session = ref("waiting...");
const authResponse = ref("waiting for bearer token...");
const courses = ref({});
const self = ref({});
const token = ref("");
const loaded = ref(false);
const authenticated = ref(false);

const student = ref("waiting for student...");
const studentId = ref("waiting for student id...");

const getSession = async () => {
    console.log("fetching...");
    let res = await fetch("/api/session");
    let body = await res.json();
    authenticated.value = body.authenticated || false;
    session.value = body;
    loaded.value = true;
    if (authenticated.value) {
        getCourses();
        getSelf();
        getStudent();
    }
};

const submitToken = async () => {
    console.log("submitting token...");
    let res = await fetch("/api/authenticate", {
        method: "post",
        body: JSON.stringify({
            canvas_token: token.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    let body = await res.json();
    authResponse.value = JSON.stringify(body, undefined, 4);
    getCourses();
    getSelf();
    getStudent();
};

const getCourses = async () => {
    console.log("getting courses...");
    let res = await fetch("/api/courses");
    courses.value = await res.json();
};

const getSelf = async () => {
    console.log("getting self...");
    let res = await fetch("/api/self");
    self.value = await res.json();
};

const getStudent = async () => {
    console.log("getting student...");

    let res = await fetch(
        "/api/student?" +
            new URLSearchParams({
                studentId: "1799828",
            })
    );
    student.value = await res.json();
};

getSession();
</script>

<template>
    <div>
        <StudentCard
            :first-name="student.first_name"
            :last-name="student.last_name"
            :student-photo="student.photo_path"
        />

        <div v-if="loaded" id="debug">
            <p>Session: {{ session }}</p>
            <div v-if="!authenticated">
                <label for="token-entry">Enter bearer token: </label>
                <input
                    v-model="token"
                    type="text"
                    name="token-entry"
                    @change="submitToken"
                />
            </div>
            <p v-if="!authenticated">Authentication response:</p>
            <textarea v-if="!authenticated" v-model="authResponse" />
            <p>Courses:</p>
            <textarea :value="JSON.stringify(courses, undefined, 4)" />
            <div v-for="course in courses" :key="course.id" class="course">
                <h2>{{ course.name }}</h2>
                <p>{{ course.course_code }}</p>
            </div>
        </div>
        <p v-else>connecting to backend...</p>
        <p>{{ studentId }}</p>
        <ClassCard />
        <ConfirmationPopup />
    </div>
</template>

<style scoped>
a {
    color: #42b983;
}

textarea {
    display: block;
}

.course {
    text-align: left;
    border-radius: 5px;
    background-color: #ccfff6;
    box-shadow: 0px 2px 8px 0px rgba(100, 100, 100, 0.2);
    width: 20rem;
    padding: 1rem;
}

#debug {
    display: flex;
    flex-direction: column;
}
</style>
