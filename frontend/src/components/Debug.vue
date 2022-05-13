<script setup>
import { ref } from 'vue'
import { StreamBarcodeReader } from "vue-barcode-reader";

const session = ref("waiting...")
const authResponse = ref("waiting for bearer token...")
const courses = ref({})
const token = ref("")
const loaded = ref(false)
const authenticated = ref(false)

const studentId = ref("waiting for student id...")

const onDecode = (result) => {
    studentId.value = result;
}

const getSession = async () => {
    console.log("fetching...")
    let res = await fetch("/api/session");
    let body = await res.json();
    authenticated.value = body.authenticated || false;
    session.value = body;
    loaded.value = true;
    if (authenticated.value)
        getCourses();
}

const submitToken = async () => {
    console.log("submitting token...")
    let res = await fetch("/api/authenticate", {
        method: "post",
        body: JSON.stringify({
            canvas_token: token.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    let body = await res.json();
    authResponse.value = JSON.stringify(body, undefined, 4);
    getCourses();
}

const getCourses = async () => {
    console.log("getting courses...")
    let res = await fetch("/api/courses")
    courses.value = await res.json();
}

getSession();
</script>

<template>
    <div v-if="loaded">
        <p>Session: {{ session }}</p>
        <textarea v-if="!authenticated">Authentication response: {{ authResponse }}</textarea>
        <textarea>Courses: {{ courses.length > 0 ? courses : "waiting for authentication..." }}</textarea>
        <div class="course" v-for="course in courses" :key="course.id">
            <h2>{{ course.name }}</h2>
            <p>{{ course.course_code }}</p>
        </div>
        <div v-if="!authenticated">
            <label for="token-entry">Enter bearer token: </label>
            <input type="text" name="token-entry" v-model="token" @change="submitToken">
        </div>
    </div>
    <p v-else>connecting to backend...</p>
    <p>{{ studentId }}</p>
    <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
</template>

<style scoped>
a {
    color: #42b983;
}

textarea {
    display: block;
    min-width: 500px;
    min-height: 200px;
    margin: 20px auto;
}

.course {
    text-align: left;
    border-radius: 5px;
    background-color: #ccfff6;
    box-shadow: 0px 2px 8px 0px rgba(100, 100, 100, 0.2);
    width: 20rem;
    padding: 1rem;
    margin: 2rem auto;
}
</style>
