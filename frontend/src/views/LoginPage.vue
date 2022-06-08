<script setup>
import { ref, computed } from "vue";
import router from "../router";
import store from "../store";
const username = ref("");
const password = ref("");

const submitting = ref(false);

const login = async () => {
    submitting.value = true;
    try {
        await store.dispatch("login", {
            username: username.value,
            password: password.value,
        });
        submitting.value = false;
        router.replace("/");
    } catch (e) {
        // Handle error
        submitting.value = false;
    }
};

const isFormValid = computed(
    () => username.value.length == 8 && password.value.length >= 8
);
</script>

<template>
    <div class="login">
        <p>Log in to your Adelaide ID account here.</p>
        <div>
            <label><b>Staff / Student ID</b></label>
            <input
                v-model="username"
                type="text"
                placeholder="a1234567"
                :disabled="submitting"
            />
        </div>
        <div>
            <label><b>Password</b></label>
            <input v-model="password" type="password" :disabled="submitting" />
        </div>
        <div class="spacer" />
        <div class="confirmation-buttons">
            <button
                class="confirmation-confirm"
                :disabled="submitting || !isFormValid"
                @click="login"
            >
                <img src="/assets/check-circle.svg" alt="Back arrow" />
                <span>Log in</span>
            </button>
            <button
                class="confirmation-cancel"
                :disabled="submitting"
                @click="router.push('register')"
            >
                <img src="/assets/check-circle.svg" alt="Back arrow" />
                <span>Register</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
