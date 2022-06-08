<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import router from "../router";
import store from "../store";
import ClassCard from "../components/ClassCard.vue";

const classes = ref([]);

const props = defineProps({
    courseName: String,
});

onMounted(async () => {
    if (props.courseName != null)
        store.commit("setHeaderText", props.courseName);

    let res = await fetch(
        "/api/assignments?course_id=" + router.currentRoute.value.params.id
    );

    classes.value = await res.json();
});
</script>

<template>
    <div class="classes">
        <ClassCard
            v-for="i in classes"
            :key="i.id"
            :id="i.id"
            :title="i.name"
            :details="i.name"
            :course-id="router.currentRoute.value.params.id"
        />
    </div>
</template>

<style scoped>
.classes {
    display: flex;
    gap: 16px;
    flex-direction: column;
}
</style>
