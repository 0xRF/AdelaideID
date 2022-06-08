<script setup>
import router from "../router";
</script>

<template>
    <div class="manual-add-page">
        <p>Manually add students without ID cards to follow-up with later.</p>
        <div class="manual-add-name">
            <div>
                <label for="first-name-input"><b>First Name</b></label>
                <input id="first-name-input" type="text" />
            </div>
            <div>
                <label for="last-name-input"><b>Last Name</b></label>
                <input id="last-name-input" type="text" />
            </div>
        </div>
        <div>
            <label for="student-id-input"><b>Student ID (optional)</b></label>
            <input id="student-id-input" type="text" />
            <!-- <img src="/assets/pencil-alt.svg" alt="Image icon"> -->
        </div>
        <div>
            <label><b>Image</b></label>
            <input
                id="hidden-image-upload"
                type="file"
                accept="image/*"
                capture="environment"
                hidden
            />
            <label for="hidden-image-upload" class="image-upload-prompt shadow">
                <img src="/assets/camera.svg" alt="Image icon" />
                <p>Add Student Photo</p>
            </label>
        </div>
        <div class="spacer" />
        <div class="confirmation-buttons">
            <button class="confirmation-cancel" @click="router.back()">
                <img src="/assets/x-circle.svg" alt="Back arrow" />
                <p>Cancel</p>
            </button>
            <button class="confirmation-confirm">
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

.image-upload-prompt img {
    width: 48px;
    height: 48px;
}
</style>
