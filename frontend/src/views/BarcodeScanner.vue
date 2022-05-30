<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";
</script>

<template>
    <div>
        <div class="overlay-scanner">
            <div class="overlay-left"></div>
            <div class="overlay-right"></div>
            <div class="overlay-top"></div>
            <div class="overlay-bottom"></div>
        </div>
        
        <div class="overlay-border">
            <div class="top-left"></div>
            <div class="top-right"></div>
            <div class="bottom-left"></div>
            <div class="bottom-right"></div>
        </div>

        <div class="barcode-reader">
            <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
        </div>
    </div>
</template>

<style>
#app {
    background-color: blue;
    color: white;
}

header {
    background-color: transparent;
}
</style>

<style scoped>
.overlay-scanner > * {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
}

.overlay-left {
    width: 28px;
    height: 100vh;
    left: 0px;
    top: 0px;
}

.overlay-right {
    width: 28px;
    height: 100vh;
    right: 0px;
    top: 0px;
}

.overlay-top {
    width: calc(100% - 28px * 2);
    height: calc(50vh - (50vw - 28px));
    top: 0px;
}

.overlay-bottom {
    width: calc(100% - 28px * 2);
    height: calc(50vh - (50vw - 28px));
    bottom: 0px;
}

.overlay-border > * {
    position: absolute;
    width: 28px;
    height: 28px;
    border-color:white;
    border-style: solid;
}

.overlay-border .top-left {
    top: calc(50vh - (50vw - 28px + 2px));
    right: calc(100% - 28px * 2 + 2px);
    border-width: 3px 0 0 3px;
}

.overlay-border .top-right {
    top: calc(50vh - (50vw - 28px + 2px));
    left: calc(100% - 28px * 2 + 2px);
    border-width: 3px 3px 0 0;
}

.overlay-border .bottom-left {
    bottom: calc(50vh - (50vw - 28px + 2px));
    right: calc(100% - 28px * 2 + 2px);
    border-width: 0 0 3px 3px;
}

.overlay-border .bottom-right {
    bottom: calc(50vh - (50vw - 28px + 2px));
    left: calc(100% - 28px * 2 + 2px);
    border-width: 0 3px 3px 0;
}
</style>