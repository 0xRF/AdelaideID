<script setup>
import StreamBarcodeReader from "../components/StreamBarcodeReader.vue";
import { ref } from "vue";

const student = ref({});
const failed = ref(false);
const onDecode = async (result) => {
    try {
        let res = await fetch("/api/student");
        let body = await res.json();
        student.value = body;
    } catch (ignore) {
        failed.value = true;
        setTimeout(() => (failed.value = false), 1000);
    }
};
</script>

<template>
    <div>
        <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
        <div class="scan-idle-options">
            <p class="scan-idle-hint">
                Scan barcode on the back of student ID card
            </p>
            <button class="manual-add">
                <img
                    class="icon"
                    src="/assets/plus-circle.svg"
                    alt="Settings icon"
                />
                <span>Add Manually</span>
            </button>
        </div>
        <div v-if="failed" class="scan-fail-options">
            <button class="scan-fail-message">
                <img src="/assets/x-circle.svg" alt="Back arrow" />
                <b>Cannot Confirm<br />Already Marked Present</b>
            </button>
        </div>
    </div>
</template>

<style>
.scan-idle-options {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    bottom: 0;
    width: 100%;
    padding: 28px;
}

.manual-add {
    padding: 8px 16px;
    gap: 8px;
    display: flex;
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
    border-radius: 20px;
    align-items: center;
}

.scan-idle-hint {
    max-width: 200px;
    text-align: center;
}

/* .scan-fail-options {
    position: absolute;
    bottom: 28px;
    width: 100%;
    margin: 0 28px;
}

.scan-fail-message {
    display: flex;
    flex-direction: row;
    width: calc(100% - 56px);
    height: 64px;
    gap: 16px;
    border: 3px solid #FF8080;
    color: #FF8080;
    filter: drop-shadow(0px 2px 8px rgba(99, 99, 99, 0.2));
    background-color: transparent;
}

.scan-fail-message img {
    height: 64px;
    width: 64px;
    padding: 20px;
}

.scan-fail-message b {
    flex-grow: 1;
    margin: 16px 0;
    height: 32px;
    display: flex;
    align-items: center;
    text-align: center;
} */
</style>
