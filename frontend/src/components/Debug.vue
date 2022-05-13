<script setup>
import { ref } from 'vue'

defineProps({
    msg: String
})

const session = ref("waiting...")
const authResponse = ref("waiting for bearer token...")
const courses = ref("waiting for authentication...")
const token = ref("")
const loaded = ref(false)
const authenticated = ref(false)

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
            canvasToken: token.value
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
        <textarea>Courses: {{ courses }}</textarea>
        <div v-if="!authenticated">
            <label for="token-entry">Enter bearer token: </label>
            <input type="text" name="token-entry" v-model="token" @change="submitToken">
        </div>
    </div>
    <p v-else>connecting to backend...</p>
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
</style>
