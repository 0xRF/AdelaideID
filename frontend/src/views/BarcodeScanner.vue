<script setup>
import StreamBarcodeReader from "../components/StreamBarcodeReader.vue";

</script>

<template>
    <div>
        <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
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
</style>
