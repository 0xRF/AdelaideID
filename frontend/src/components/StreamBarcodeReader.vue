<template>
    <div class="scanner-container">
        <div class="overlay-element"></div>
        <div class="overlay-corners"></div>
        <video v-show="!isLoading" poster="data:image/gif,AAAA" ref="scanner"></video>
    </div>
</template>


<script>
// Using code from https://github.com/olefirenko/vue-barcode-reader

import { BrowserMultiFormatReader, Exception } from "@zxing/library";

export default {
    name: "stream-barcode-reader",

    data() {
        return {
            isLoading: false,
            codeReader: new BrowserMultiFormatReader(),
            isMediaStreamAPISupported:
                navigator &&
                navigator.mediaDevices &&
                "enumerateDevices" in navigator.mediaDevices
        };
    },

    mounted() {
        if (!this.isMediaStreamAPISupported) {
            throw new Exception("Media Stream API is not supported");
        }

        this.start();
        this.$refs.scanner.oncanplay = event => {
            this.isLoading = false;
            this.$emit("loaded");
        };
    },

    beforeUnmount() {
        this.codeReader.reset();
    },

    methods: {
        start() {
            this.codeReader.decodeFromVideoDevice(
                undefined,
                this.$refs.scanner,
                (result, err) => {
                    if (result) {
                        this.$emit("decode", result.text);
                    }
                }
            );
        }
    }
};
</script>

<style scoped>
.scanner-container {
    --outline-color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
}

video {
    width: 100%;
    max-height: 100%;
}

.overlay-element {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);

    clip-path: polygon(
        0%                  0%, 
        0%                  100%, 
        28px                100%,
        28px                calc(50% - (50vw - 28px)),
        calc(100% - 28px)   calc(50% - (50vw - 28px)),
        calc(100% - 28px)   calc(50% + (50vw - 28px)), 
        28px                calc(50% + (50vw - 28px)),
        28px                100%,
        100%                100%,
        100%                0% 
    );
}


.overlay-corners {
    /* based on https://stackoverflow.com/questions/14387690/how-can-i-show-only-corner-borders */ 
    position: absolute;
    width: calc(100% - 56px + 6px);
    height: calc(100vw - 56px + 6px);

    left: 0; 
    right: 0; 
    margin: 0 auto; 

    background:
    linear-gradient(to right, var(--outline-color) 3px, transparent 3px) 0 0,
    linear-gradient(to right, var(--outline-color) 3px, transparent 3px) 0 100%,
    linear-gradient(to left, var(--outline-color) 3px, transparent 3px) 100% 0,
    linear-gradient(to left, var(--outline-color) 3px, transparent 3px) 100% 100%,
    linear-gradient(to bottom, var(--outline-color) 3px, transparent 3px) 0 0,
    linear-gradient(to bottom, var(--outline-color) 3px, transparent 3px) 100% 0,
    linear-gradient(to top, var(--outline-color) 3px, transparent 3px) 0 100%,
    linear-gradient(to top, var(--outline-color) 3px, transparent 3px) 100% 100%;

    /* linear-gradient(to right, purple 3px, transparent 3px)  28px                calc(50vw - 14px),
    linear-gradient(to right, blue 3px, transparent 3px)    28px                calc(100% - (50vw - 14px)),
    linear-gradient(to left, red 3px, transparent 3px)      calc(100% - 28px)   calc(50vw - 14px),
    linear-gradient(to left, green 3px, transparent 3px)    calc(100% - 28px)   calc(100% - (50vw - 14px)),
    linear-gradient(to bottom, yellow 3px, transparent 3px) 28px                calc(50vw - 14px),
    linear-gradient(to bottom, orange 3px, transparent 3px) calc(100% - 28px)   calc(50vw - 14px),
    linear-gradient(to top, pink 3px, transparent 3px)      calc(100% - 28px)   calc(100% - (50vw - 14px)),
    linear-gradient(to top, white 3px, transparent 3px)     28px                calc(100% - (50vw - 14px)); */

    background-repeat: no-repeat;
    background-size: 28px 28px;
}
</style>