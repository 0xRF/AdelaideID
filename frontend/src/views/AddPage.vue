<script setup>
import { ref, computed } from "vue";
import router from "../router";

const first_name = ref("");
const last_name = ref("");
const username = ref("");

const photo_file = ref("");

const isFormValid = computed(
    () => first_name.value.length > 0 && last_name.value.length > 0
);

const uploadImage = (event) => {
    photo_file.value = event.target.files[0];
};

const submit = async () => {
    const formData = new FormData();
    formData.append("file", photo_file.value);
    let res = await fetch("/api/partial", {
        method: "POST",
        body: formData,
    });

    if (res.status != 200) console.log("error");
};
</script>

<template>
    <div class="manual-add-page">
        <p>Manually add students without ID cards to follow-up with later.</p>
        <div class="manual-add-name">
            <div>
                <label for="first-name-input"><b>First Name</b></label>
                <input v-model="first_name" id="first-name-input" type="text" />
            </div>
            <div>
                <label for="last-name-input"><b>Last Name</b></label>
                <input v-model="last_name" id="last-name-input" type="text" />
            </div>
        </div>
        <div>
            <label for="student-id-input"><b>Student ID (optional)</b></label>

            <input
                placeholder="a1234567"
                v-model="username"
                id="student-id-input"
                type="text"
            />
            <!-- <img src="/assets/pencil-alt.svg" alt="Image icon"> -->
        </div>
        <div>
            <label><b>Image</b></label>
            <input
                @change="uploadImage($event)"
                id="hidden-image-upload"
                type="file"
                accept="image/*"
                capture="environment"
            />
            <label
                v-if="!photo_path"
                for="hidden-image-upload"
                class="image-upload-prompt shadow"
            >
                <svg
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
                <p>Add Student Photo</p>
            </label>
            <label
                v-else
                for="hidden-image-upload"
                class="image-upload-prompt shadow"
            >
                <img src="/assets/camera.svg" alt="Image icon" />
                <img :src="photo_path" alt="Uploaded image" />
                <p>Change Student Photo {{ photo_path }}??</p>
            </label>
        </div>
        <div class="spacer" />
        <div class="confirmation-buttons">
            <button class="confirmation-cancel" @click="router.back()">
                <img src="/assets/x-circle.svg" alt="Back arrow" />
                <p>Cancel</p>
            </button>
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

.image-upload-prompt {
    cursor: pointer;
    background-color: #e5e5e5;
    height: 128px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.image-upload-prompt img,
svg {
    width: 48px;
    height: 48px;
}
</style>
