<script setup>
import router from "./router";
import store from "./store";
import { ref } from "vue";
const scrolled = ref(false);
const onScroll = (e) => {
    if (scrolled.value) {
        if (e.target.scrollTop == 0) scrolled.value = false;
    } else {
        if (e.target.scrollTop > 0) scrolled.value = true;
    }
};
</script>

<template>
    <header
        :class="{
            shadow: scrolled,
            invert: router.currentRoute.value.meta.invert,
        }"
    >
        <a
            v-if="
                router.currentRoute.value.path != '/' &&
                router.currentRoute.value.path != '/login'
            "
            style="cursor: pointer"
            @click="router.back()"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
        </a>
        <div v-else class="icon" />
        <h1 class="title">{{ store.state.headerText }}</h1>
        <router-link
            v-if="router.currentRoute.value.path != '/settings'"
            to="/settings"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        </router-link>
    </header>

    <div v-if="!router.currentRoute.value.meta.fullscreen" id="headergap" />

    <main
        :class="{ padded: !router.currentRoute.value.meta.fullscreen }"
        @scroll="onScroll"
    >
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component
                    :is="Component"
                    style="min-height: 100%"
                    :style="{
                        height: router.currentRoute.value.meta.fullscreen
                            ? '100%'
                            : null,
                    }"
                    :class="{ invert: router.currentRoute.value.meta.invert }"
                />
            </transition>
        </router-view>
    </main>
</template>
