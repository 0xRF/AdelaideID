<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import CourseCard from "../components/CourseCard.vue";

const courses = ref([]);

onMounted(async () => {
    let res = await fetch("/api/courses");
    courses.value = await res.json();
});
</script>

<template>
    <div class="courses">
        <CourseCard
            v-for="course in courses"
            :id="course.id"
            :key="course.id"
            :title="course.name"
            :details="course.course_code"
        />
    </div>
</template>

<style scoped>
.courses {
    display: flex;
    gap: 16px;
    flex-direction: column;
}
</style>
