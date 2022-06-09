<script setup>
import { ref, onMounted } from "vue";
import store from "../store";

const name = ref("");

onMounted(async () => {
    if (store.state.isLoggedIn) {
        let res = await fetch("/api/self");
        let body = await res.json();
        name.value = body.name;
    }
});
</script>

<template>
    <div>
        <label v-if="store.state.isLoggedIn"
            >Signed in as <b>{{ name }}</b></label
        >
        <label v-else>Not logged in</label>
        <div class="confirmation-buttons">
            <button
                :disabled="!store.state.isLoggedIn"
                @click="store.dispatch('logout')"
            >
                <img src="/assets/logout.svg" alt="Logout icon" />
                <span>Log out</span>
            </button>
        </div>
    </div>
</template>
