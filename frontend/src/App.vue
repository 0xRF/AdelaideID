<script setup>
import Debug from './components/Debug.vue'
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

const studentId = ref("waiting for student id...")

const onDecode = (result) => {
    studentId.value = result;
}
</script>

<template>
    <Debug />
    <p>{{ studentId }}</p>
    <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
