<script setup>
import { ref } from "vue";
import router from "../router";
import seedrandom from "seedrandom";

let props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        default: "",
    },
    details: {
        type: String,
        default: "",
    },
});

var seed = seedrandom(props.id);

const colour = ref(
    `background-color: hsl(${Math.round(seed() * 360)}, 100%, 90%)`
);

const openMyUni = () => {
    window.open("https://myuni.adelaide.edu.au/courses/" + props.id);
};

const goToClasses = () => {
    router.push({
        name: "Classes",
        params: { id: props.id, courseName: props.title },
    });
};
</script>

<template>
    <div class="card" :style="colour">
        <div class="card-heading">
            <div class="card-text">
                <h2>{{ title }}</h2>
            </div>
        </div>
        <div>
            <div class="card-text">
                <p>{{ details }}</p>
            </div>
        </div>
        <div class="navigation">
            <button style="flex: 1" @click="openMyUni">
                <img class="icon" src="/assets/external-link.svg" />
                <span>MyUni</span>
            </button>
            <button style="flex: 2" @click="goToClasses">
                <img class="icon" src="/assets/collection.svg" />
                <span>View classes</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;

    border-radius: 5px;
    height: 176px;
    padding: 16px;

    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.card button {
    background-color: white;
}

.card-text {
    display: table-cell;
    vertical-align: middle;
    font-size: 16px;
    height: 28px;
}

.card-heading {
    margin-bottom: 8px;
}

.navigation {
    display: flex;
    gap: 16px;
    margin-top: auto;
}

.navigation button {
    padding: 8px 16px;
    gap: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>
