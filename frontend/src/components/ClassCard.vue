<script setup>
import { ref } from "vue";

defineProps({
    title: {
        type: String,
        default: "",
    },
    details: {
        type: String,
        default: "",
    },
});

const colour = ref(`background-color: hsl(${0}, 100%, 90%)`);
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
            <button style="flex-grow: 1">
                <img src="/assets/external-link.svg" />
                <p>MyUni</p>
            </button>
            <button style="flex-grow: 2">
                <img src="/assets/plus-circle.svg" />
                <p>Scan ID</p>
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
    margin-bottom: 16px;

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
    height: 28px;
    /* gap: 8px; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

button img {
    height: 16px;
    width: 16px;
}

button > * {
    margin: 4px;
}
</style>
