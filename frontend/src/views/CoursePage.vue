<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import ClassCard from "../components/ClassCard.vue";

const courses = ref([]);

onMounted(async () => {
    let res = await fetch("/api/courses");
    courses.value = await res.json();
});
</script>

<template>
    <div class="courses">
        <ClassCard
            v-for="course in courses"
            :key="course.id"
            :id="course.id"
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
