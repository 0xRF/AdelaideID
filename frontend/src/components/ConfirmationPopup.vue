<script setup>
import { ref } from "vue";
import seedrandom from "seedrandom";
import router from "../router";
import md5 from "md5";

defineProps({
    id: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        default: "",
    },
    className: {
        type: String,
        default: "",
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
});

let seed = seedrandom(md5(parseInt(router.currentRoute.value.params.id)));

const colour = ref(
    `background-color: hsl(${Math.round(seed() * 360)}, 100%, 90%)`
);

const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
    <div class="confirmation-popup shadow" :style="colour">
        <div v-if="confirmed" class="success-content">
            <img class="success-icon" src="/assets/check-circle-alt.svg" />
            <p class="success-message"><b>Successfully added!</b></p>
        </div>

        <div v-else class="content">
            <p class="confirmation-text">
                Mark <b>{{ name }}</b> as present for <b>{{ className }}</b
                >?
            </p>
            <div class="confirmation-buttons">
                <button class="confirmation-cancel" @click="emit('cancel')">
                    <img src="/assets/x-circle.svg" alt="Back arrow" />
                    <span>Cancel</span>
                </button>
                <button class="confirmation-confirm" @click="emit('confirm')">
                    <img src="/assets/check-circle.svg" alt="Back arrow" />
                    <span>Confirm</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.confirmation-popup {
    /* background-color: antiquewhite; */

    width: 100%;
    height: 192px;
    left: 0;
    bottom: 0;

    color: #363636;

    /* background-color: #ccfff7; */
    border-radius: 20px 20px 0px 0px;
    padding: 32px 28px;

    z-index: 100;
}

.confirmation-text {
    text-align: center;
}

.success-icon {
    height: 48px;
    width: 48px;
}

.content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.success-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.success-content b {
    width: 100%;
    text-align: center;
}
</style>
