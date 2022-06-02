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
    <div class="confirmation-popup">
        <div v-if="changeme" class="success-message">
            <img class="success-icon" src="/assets/check-circle-alt.svg" />
            <p class="success-message"><b>Successfully added!</b></p>
        </div>
        
        <div v-else>
            <p class="confirmation-text">Mark <b>Jimmy</b> as present for <b>Web and Database Computing?</b></p>
            <div class="confirmation-buttons">
                <button class="confirmation-cancel">
                    <img src="/assets/x-circle.svg" alt="Back arrow"/>
                    <p>Cancel</p>
                </button>
                <button class="confirmation-confirm">
                    <img src="/assets/check-circle.svg" alt="Back arrow"/>
                    <p>Confirm</p>
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
    left: 0px;
    bottom: 0;

    background: #CCFFF7;
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
    border-radius: 20px 20px 0px 0px;
    padding: 32px 28px;

}

.confirmation-text {
    width: auto;
    height: 32px;

    /* display: flex; */
    /* align-items: center; */
    text-align: center;
    margin-bottom: 32px;
}

.success-icon {
    height: 48px;
    width: 48px;
    padding: 8px;
}

.success-message {
    width: 200px;
    height: 64px;
    display: flex;
    align-items: center;
}

.success-message b {
    width: 100%;
    text-align: center;
}

.success-message {
    display: flex;
    align-items: center;
    height: 100%;
    margin: auto;
}

</style>
