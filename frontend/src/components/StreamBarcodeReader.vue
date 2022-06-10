<template>
    <div class="scanner-container">
        <div v-if="!blur" class="overlay-element"></div>
        <div v-if="!blur" class="overlay-corners"></div>
        <video v-show="!isLoading" ref="scanner" :class="{ 'video-blur': blur }" poster="data:image/gif,AAAA"></video>
    </div>
</template>

<script>
// Using code from https://github.com/olefirenko/vue-barcode-reader

import { BrowserMultiFormatReader, Exception } from "@zxing/library";

export default {
    name: "StreamBarcodeReader",

    props: {
        blur: {
         type: Number,
         default: 0
        }
    },
    data() {
        return {
            isLoading: false,
            codeReader: new BrowserMultiFormatReader(),
            isMediaStreamAPISupported:
                navigator &&
                navigator.mediaDevices &&
                "enumerateDevices" in navigator.mediaDevices,
        };
    },

    mounted() {
        if (!this.isMediaStreamAPISupported) {
            throw new Exception("Media Stream API is not supported");
        }

        this.start();
        this.$refs.scanner.oncanplay = () => {
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
                (result) => {
                    if (result) {
                        this.$emit("decode", result.text);
                    }
                }
            );
        },
    },
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
    background-color: grey;
}

video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.overlay-element {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    clip-path: polygon(0% 0%,
            0% 100%,
            28px 100%,
            28px calc(50% - (50vw - 28px)),
            calc(100% - 28px) calc(50% - (50vw - 28px)),
            calc(100% - 28px) calc(50% + (50vw - 28px)),
            28px calc(50% + (50vw - 28px)),
            28px 100%,
            100% 100%,
            100% 0%);
}

.overlay-corners {
    /* based on https://stackoverflow.com/questions/14387690/how-can-i-show-only-corner-borders */
    position: absolute;
    width: calc(100% - 56px + 6px);
    height: calc(100vw - 56px + 6px);

    left: 0;
    right: 0;
    margin: 0 auto;

    background: linear-gradient(to right,
            var(--outline-color) 3px,
            transparent 3px) 0 0,
        linear-gradient(to right, var(--outline-color) 3px, transparent 3px) 0 100%,
        linear-gradient(to left, var(--outline-color) 3px, transparent 3px) 100% 0,
        linear-gradient(to left, var(--outline-color) 3px, transparent 3px) 100% 100%,
        linear-gradient(to bottom, var(--outline-color) 3px, transparent 3px) 0 0,
        linear-gradient(to bottom, var(--outline-color) 3px, transparent 3px) 100% 0,
        linear-gradient(to top, var(--outline-color) 3px, transparent 3px) 0 100%,
        linear-gradient(to top, var(--outline-color) 3px, transparent 3px) 100% 100%;

    background-repeat: no-repeat;
    background-size: 28px 28px;
}

.video-blur {
    filter: blur(50px) brightness(0.5);
}
</style>
