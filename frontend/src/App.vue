<script setup>
import ClassCard from "./components/ClassCard.vue";
</script>

<template>
    <header>
        <button><img src="/assets/arrow-left.svg" alt="Back arrow" /></button>
        <h1 class="title">Practical 15069</h1>
        <button><img src="/assets/cog.svg" alt="Settings icon" /></button>
    </header>

    <main>
        <ClassCard title="Workshop WR02" details="4210_COMP_SCI_X_0019" />
        <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transitionName">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Space+Grotesk:400,500,700&display=swap");

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

* {
    box-sizing: border-box;
    font-family: "Space Grotesk", sans-serif;
}

body,
h1,
h2,
p {
    margin: 0;
}

h2 {
    font-size: 16px;
}

p {
    font-size: 14px;
}

header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

header button {
    display: inline-block;
    border: none;
    background-color: transparent;

    height: 64px;
    width: 64px;
    padding: 20px;
    border-radius: 20px;
}

.title {
    display: inline-block;
    font-size: 24px;
    height: 32px;
    flex: 1;
}

main {
    margin: 0 28px 32px 28px;
}
</style>
