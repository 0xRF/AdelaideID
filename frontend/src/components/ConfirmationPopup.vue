<script setup>
// import { ref } from "vue";

// defineProps({
//     title: {
//         type: String,
//         default: "",
//     },
//     details: {
//         type: String,
//         default: "",
//     },
// });
</script>

<template>
    <div class="confirmation-popup shadow">
        <div v-if="false" class="success-content">
            <img class="success-icon" src="/assets/check-circle-alt.svg" />
            <p class="success-message"><b>Successfully added!</b></p>
        </div>

        <div v-else class="content">
            <p class="confirmation-text">
                Mark <b>Jimmy</b> as present for
                <b>Web and Database Computing?</b>
            </p>
            <div class="confirmation-buttons">
                <button class="confirmation-cancel">
                    <img src="/assets/x-circle.svg" alt="Back arrow" />
                    <span>Cancel</span>
                </button>
                <button class="confirmation-confirm">
                    <img src="/assets/check-circle.svg" alt="Back arrow" />
                    <span>Confirm</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.confirmation-popup {
    position: fixed;
    background-color: antiquewhite;

    width: 100%;
    height: 192px;
    left: 0;
    bottom: 0;

    background: #ccfff7;
    border-radius: 20px 20px 0px 0px;
    padding: 32px 28px;
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
