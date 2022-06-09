<script setup>
import StreamBarcodeReader from "../components/StreamBarcodeReader.vue";
import StudentCard from "../components/StudentCard.vue";
import ConfirmationPopup from "../components/ConfirmationPopup.vue";

import { ref, onMounted } from "vue";
import router from "../router";
import store from "../store";

const student = ref({});
const failed = ref(false);
const success = ref(false);
const confirmed = ref(false);

const errorMessage = ref("Unknown error");

const props = defineProps({
    className: String,
});

const onDecode = async (result) => {
    try {
        if (failed.value) {
            return;
        }

        if (result.length != 7) {
            throw { name: "InvalidBarcodeError", message: "Invalid Barcode" };
        }

        let res = await fetch("/api/student?studentId=" + result);

        if (res.status != 200) {
            throw {
                name: "InvalidBarcodeError",
                message: "Unable to fetch student details",
            };
        }

        let body = await res.json();
        student.value = body;

        success.value = true;
        failed.value = false;
    } catch (error) {
        errorMessage.value = error.message;
        failed.value = true;
        setTimeout(() => (failed.value = false), 3000);
    }
};

const onConfirm = () => {
    confirmed.value = true;
};

const onCancel = () => {
    success.value = false;
    student.value = {};
};

onMounted(() => {
    if (props.className != null) store.commit("setHeaderText", props.className);
});

success.value = true;

</script>

<template>
    <div>
        <StreamBarcodeReader
            @decode="onDecode"
            :blur="success"
        ></StreamBarcodeReader>

        <div class="confirmation-window" v-if="success">
            <div class="spacer"></div>
            <StudentCard
                class="student-card"
                :first-name="student.first_name"
                :last-name="student.last_name"
                :student-id="student.student_id"
                :student-photo="student.photo_path"
            />
            <div class="spacer"></div>
            <ConfirmationPopup
                :name="student.first_name"
                :confirmed="confirmed"
                :class-name="props.className"
                class="confirmation-popup"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
        </div>

        <div v-if="!failed" class="scan-idle-options">
            <p class="scan-idle-hint">
                Scan barcode on the back of student ID card
            </p>
            <button
                class="manual-add"
                @click="
                    router.push({
                        name: 'Manual Add',
                        params: { id: router.currentRoute.value.params.id },
                    })
                "
            >
                <img
                    class="icon"
                    src="/assets/plus-circle.svg"
                    alt="Settings icon"
                />
                <span>Add manually</span>
            </button>
        </div>
        <div v-else class="scan-fail-parent">
            <div class="scan-fail-message">
                <svg
                    alt="Back arrow"
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <b>{{ errorMessage }}</b>
            </div>
        </div>
    </div>
</template>

<style>
.scan-idle-options {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    bottom: 0;
    width: 100%;
    padding: 28px;
}

.manual-add {
    padding: 8px 16px;
    gap: 8px;
    display: flex;
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
    border-radius: 20px;
    align-items: center;
    text-decoration: none;
}

.scan-idle-hint {
    max-width: 200px;
    text-align: center;
}

.scan-fail-parent {
    position: absolute;
    bottom: 28px;
    width: 100%;
}

.scan-fail-message {
    border-radius: 20px;
    margin: 0 28px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    border: 3px solid #ff8080;
    color: #ff8080;
    filter: drop-shadow(0px 2px 8px rgba(99, 99, 99, 0.2));
    background-color: transparent;
}

.scan-fail-message svg {
    height: 64px;
    width: 64px;
    padding: 20px;
}

.scan-fail-message b {
    flex-grow: 1;
    margin: 16px 0;
    height: 32px;
    display: flex;
    align-items: center;
    text-align: center;
}

.confirmation-window {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 25;
    display: flex;
    flex-direction: column;
}

.student-card {
    margin: 0 28px;
}
</style>
