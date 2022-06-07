<script setup>
import { ref, computed } from "vue";
import router from "../router";
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const bearerToken = ref("");

const submitting = ref(false);

const register = async () => {
    submitting.value = true;

    let res = await fetch("/api/register", {
        method: "post",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            canvas_token: bearerToken,
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
        bearerToken.value != "" &&
        password.value.length >= 8 &&
        password.value == confirmPassword.value
);
</script>

<template>
    <div class="registration">
        <p>
            Create an account for Adelaide ID here. Avoid re-using your MyUni
            password.
        </p>
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
        <div>
            <label><b>Confirm Password</b></label>
            <input
                v-model="confirmPassword"
                type="password"
                :disabled="submitting"
            />
        </div>
        <div>
            <label
                ><b>Canvas Bearer Token</b><br />
                <span
                    >Head over to your
                    <a
                        href="https://myuni.adelaide.edu.au/profile/settings"
                        target="_blank"
                        >MyUni Settings</a
                    >
                    and under <i>approved integrations</i> select
                    <b>new access token</b> to generate your bearer token.</span
                ></label
            >
            <input
                v-model="bearerToken"
                type="text"
                placeholder="7036~XXXXXXXXXXXX"
                :disabled="submitting"
            />
        </div>
        <div class="spacer" />
        <div class="confirmation-buttons">
        <router-link to='/LoginPage.vue'>
            <button
                class="confirmation-confirm"
                :disabled="submitting || !isFormValid"
                @click="register"
            >
                <img src="/assets/check-circle.svg" alt="Back arrow" />
                <p>Register</p>
            </button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.registration {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
