<script setup>
import router from "./router";
</script>

<template>
    <header>
        <a v-if="router.currentRoute.value.path != '/'" @click="router.back()"
            ><img src="/assets/arrow-left.svg" alt="Back arrow"
        /></a>
        <div v-else style="width: 24px" />
        <h1 class="title">{{ router.currentRoute.value.name }}</h1>
        <router-link
            v-if="router.currentRoute.value.path != '/settings'"
            to="/settings"
            ><img src="/assets/cog.svg" alt="Settings icon" style="pointer: cursor;"
        /></router-link>
    </header>

    
    <div v-if="!router.currentRoute.value.meta.fullscreen" id="headergap" />

    <router-view v-if="router.currentRoute.value.meta.fullscreen" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>

    <main v-else>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>
