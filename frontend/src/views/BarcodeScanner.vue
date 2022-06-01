<script setup>
import StreamBarcodeReader from "../components/StreamBarcodeReader.vue";

</script>

<template>
    <div>
        <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
        <div class="scan-idle-options">
            <p class="scan-idle-hint">Scan barcode on the back of student ID card</p>
            <button class="manual-add"><img src="/assets/plus-circle.svg" alt="Settings icon">Add Manually</button>
        </div>
        <!-- <div class="scan-fail-options">
            <button class="scan-fail-message">
                <img src="/assets/x-circle.svg" alt="Back arrow"/>
                <b>Cannot Confirm<br>Already Marked Present</b>
            </button>
        </div> -->
    </div>
</template>

<style>
#app {
    background-color: #363636;
    color: white;
}

header {
    background-color: transparent;
}

.scan-idle-options {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    width: 100%;
    height: 166px;
    padding: 28px;
}

.manual-add {
    width: 162px;
    height: 42px;

    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
    border-radius: 20px;
}

.manual-add img {
    height: 28px;
    width: 28px;
}

.scan-idle-hint {
    height: 40px;
    max-width: 200px;
    text-align: center;
    margin-bottom: 28px;
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
