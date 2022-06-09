<script setup>
import { ref } from "vue";
import store from "../store";

const name = ref("");

fetch("/api/self")
.then(response => response.json())
.then(result => {
    name.value = result.name;
});

</script>

<template>
    <div>
        <p>Signed in as <b>{{ name }}</b></p>
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


<style scoped>
.confirmation-buttons button {
    border-radius: 5px;
    background-color: white;
}
</style>