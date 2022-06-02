<template>
    <div class="manual-add-page">
        <p>Manually add students without ID cards to follow-up with later.</p>
        <div class="manual-add-name">
            <div>
                <label for="first-name-input"><b>First Name</b></label>
                <input id="first-name-input" type="text">
            </div>
            <div>
                <label for="last-name-input"><b>Last Name</b></label>
                <input id="last-name-input" type="text">
            </div>
        </div>
        <div>
            <label for="student-id-input"><b>Student ID (optional)</b></label>
            <input id="student-id-input" type="text">
            <!-- <img src="/assets/pencil-alt.svg" alt="Image icon"> -->
        </div>
        <div>
            <label><b>Image</b></label>
            <input id="hidden-image-upload" type="file" accept="image/*" capture="environment" hidden>
            <label for="hidden-image-upload" class="image-upload-prompt">
                <img src="/assets/camera.svg" alt="Image icon">
                <p>Add Student Photo</p>
            </label>
        </div>
        <div class="confirmation-buttons">
            <button class="confirmation-cancel">
                <img src="/assets/x-circle.svg" alt="Back arrow"/>
                <p>Cancel</p>
            </button>
            <button class="confirmation-confirm">
                <img src="/assets/check-circle.svg" alt="Back arrow"/>
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
    min-height: 100%;
}

.manual-add-name {
    display: flex;
    gap: 16px;
}

.manual-add-name div {
    flex: 1;
}

input {
    width: 100%;
}

label {
    height: 32px;
    display: flex;
    align-items: center;
}

.image-upload-prompt {
    background-color: #E5E5E5;
    height: 128px;
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.image-upload-prompt img {
    width: 48px;
    height: 48px;
}

.confirmation-buttons {
    flex: 1;
}
.confirmation-buttons button {
    margin-top: auto;
}
</style>
