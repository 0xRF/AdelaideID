<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

import router from "../router";
import store from "../store";
import ClassCard from "../components/ClassCard.vue";

const classes = ref([]);

const props = defineProps({
    courseName: {
        type: String,
        default: ""
    }
});


const getDate = (item) => {
    let _date = new Date(item.due_at);
    return _date.toLocaleString("en-AU", { weekday: 'long', month: 'long', day: 'numeric' });
};

onMounted(async () => {
    if (props.courseName != null)
        store.commit("setHeaderText", props.courseName);

    let res = await fetch(
        "/api/assignments?" +
        new URLSearchParams({
            course_id: router.currentRoute.value.params.id,
        })
    );

    classes.value = await res.json();
    console.log(classes.value);


});
</script>

<template>
    <div class="classes">
        <ClassCard v-for="i in classes" :id="i.id" :key="i.id" :title="i.name" :details="getDate(i)"
            :course-id="router.currentRoute.value.params.id" />
    </div>
</template>

<style scoped>
.classes {
    display: flex;
    gap: 16px;
    flex-direction: column;
}
</style>
