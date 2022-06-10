import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

createApp(App).use(router).use(store).mount("#app");

if ("serviceWorker" in navigator) {
    // && !/localhost/.test(window.location)) {
    registerSW();
}
