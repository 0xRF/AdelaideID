<script setup>
import { ref, computed } from "vue";
import router from "../router";
import seedrandom from "seedrandom";

const first_name = ref("");
const last_name = ref("");
const student_id = ref("");

const photo_file = ref("");

const imageData = ref("");

const isFormValid = computed(
    () =>
        first_name.value.length > 0 &&
        last_name.value.length > 0 &&
        (student_id.value.length == 8 || student_id.value.length == 0) &&
        imageData.value != ""
);

const uploadImage = async (event) => {
    photo_file.value = event.target.files[0];

    imageData.value = URL.createObjectURL(photo_file.value);
};

const submit = async () => {
    const formData = new FormData();
    formData.append("file", photo_file.value);
    formData.append("first_name", first_name.value);
    formData.append("last_name", last_name.value);
    formData.append("assignment_id", router.currentRoute.value.params.id);
    if (student_id.value.length == 8)
        formData.append("student_id", student_id.value);
    let res = await fetch("/api/followup", {
        method: "POST",
        body: formData,
    });
    if (res.status != 200) console.log("error");

    router.back();
};

let seed = seedrandom(parseInt(router.currentRoute.value.params.id));
const colour = ref(
    `background-color: hsl(${Math.round(seed() * 360)}, 100%, 90%)`
);
</script>

<template>
    <div class="manual-add-page">
        <div class="background" :style="colour" />
        <p>Manually add students without ID cards to follow-up with later.</p>
        <div class="manual-add-name">
            <div>
                <label for="first-name-input"><b>First Name</b></label>
                <input id="first-name-input" v-model="first_name" type="text" />
            </div>
            <div>
                <label for="last-name-input"><b>Last Name</b></label>
                <input id="last-name-input" v-model="last_name" type="text" />
            </div>
        </div>
        <div>
            <label for="student-id-input"><b>Student ID (optional)</b></label>

            <input
                id="student-id-input"
                v-model="student_id"
                placeholder="a1234567"
                type="text"
            />
        </div>
        <div class="image-container">
            <label><b>Image</b></label>
            <input
                id="hidden-image-upload"
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                @change="uploadImage($event)"
            />
            <label
                for="hidden-image-upload"
                class="image-upload-prompt shadow"
                :style="
                    imageData
                        ? 'background-color: white'
                        : 'background-color: #e5e5e5'
                "
            >
                <svg
                    v-if="!imageData"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    alt="Image icon"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <img
                    v-if="imageData"
                    class="uploaded-image"
                    :src="imageData"
                    alt="Uploaded Image"
                />

                <p v-if="!imageData">Add Student Photo</p>
            </label>
        </div>
        <div class="confirmation-buttons">
            <button
                class="confirmation-confirm"
                :disabled="!isFormValid"
                @click="submit"
            >
                <img src="/assets/check-circle.svg" alt="Back arrow" />
                <p>Confirm</p>
            </button>
        </div>
    </div>
</template>

<style scoped>
.manual-add-page {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.manual-add-name {
    display: flex;
    gap: 16px;
}

.manual-add-name div {
    flex: 1;
}

.image-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.image-upload-prompt {
    flex: 1;
    cursor: pointer;
    background-color: #e5e5e5;
    height: 100%;
    border-radius: 5px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.image-upload-prompt svg {
    width: 48px;
    height: 48px;
}

.uploaded-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    border-radius: 5px;
}

.background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -10;
}
</style>
