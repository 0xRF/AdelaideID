<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

import router from "../router";
import store from "../store";
import ClassCard from "../components/ClassCard.vue";

const classes = ref([]);

const getDate = (item) => {
    let _date = new Date(item.due_at);
    return _date.toLocaleString("en-AU", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
};

onMounted(async () => {
    if (!store.state.courseNames[router.currentRoute.value.params.id]) {
        let res = await fetch(
            "/api/course?" +
                new URLSearchParams({
                    course_id: router.currentRoute.value.params.id,
                })
        );
        let course = await res.json();
        store.commit("addCourseName", { id: course.id, name: course.name });
    }

    store.commit(
        "setHeaderText",
        store.state.courseNames[router.currentRoute.value.params.id]
    );

    let res = await fetch(
        "/api/assignments?" +
            new URLSearchParams({
                course_id: router.currentRoute.value.params.id,
            })
    );

    classes.value = await res.json();

    for (let c of classes.value) {
        if (!store.state.classNames[c.id]) {
            store.commit("addClassName", { id: c.id, name: c.name });
        }
    }
});
</script>

<template>
    <div class="classes">
        <ClassCard
            v-for="i in classes"
            :id="i.id"
            :key="i.id"
            :title="i.name"
            :details="getDate(i)"
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
