<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

const courses = ref([]);

import ClassCard from "../components/ClassCard.vue";

onMounted(async () => {
    let res = await fetch("/api/courses");

    courses.value = await res.json();
});
</script>

<template>
    <div>
        <ClassCard
            v-for="course in courses"
            :key="course.id"
            :id="course.id"
            :title="course.name"
            :details="course.course_code"
        />
    </div>
</template>
