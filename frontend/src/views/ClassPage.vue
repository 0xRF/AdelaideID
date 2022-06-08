<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import router from "../router";
import ClassCard from "../components/ClassCard.vue";

const classes = ref([]);

onMounted(async () => {
    let res = await fetch(
        "/api/assignments?class_id=" + router.currentRoute.value.params.id
    );

    classes.value = await res.json();
    console.log(classes.value);
});
</script>

<template>
    <div>
        <ClassCard
            v-for="i in classes"
            :key="i.id"
            :id="i.id"
            :title="i.name"
            :details="i.class_code"
        />
    </div>
</template>
