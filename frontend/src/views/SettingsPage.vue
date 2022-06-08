<script setup>
import store from "../store";
</script>

<template>
    <div>
        <div class="confirmation-buttons">
            <button
                :disabled="!store.state.isLoggedIn"
                @click="store.dispatch('logout')"
            >
                <img src="/assets/check-circle.svg" alt="Back arrow" />
                <span>Log out</span>
            </button>
        </div>
    </div>
</template>
