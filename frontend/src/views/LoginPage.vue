<script setup>
import { ref, computed } from "vue";
import router from "../router";
const username = ref("");
const password = ref("");

const submitting = ref(false);

const login = async () => {
    submitting.value = true;
    let res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    submitting.value = false;
    if (res.status == 200) router.replace("/");
};

const isFormValid = computed(
    () =>
        username.value.length == 8 &&
        password.value >= 8
);
</script>

<template>
    <div class="login">
        <p>Log in to your Adelaide ID  account here.</p>
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
