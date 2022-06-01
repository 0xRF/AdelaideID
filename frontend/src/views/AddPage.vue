<template>
    <div class="manual-add-page">
        <p>Manually add students without ID cards to follow-up with later.</p>
        <div class="manual-add-name">
            <div>
                <label><b>First Name</b></label>
                <input type="text">
            </div>
            <div>
                <label><b>Last Name</b></label>
                <input type="text">
            </div>
        </div>
        <div>
            <label><b>Student ID (optional)</b></label>
            <input type="text">
            <!-- <img src="/assets/pencil-alt.svg" alt="Image icon"> -->
        </div>
        <div>
            <label><b>Image</b></label>
            <!-- <img src="/assets/camera.svg" alt="Image icon"> -->
            <input class="image-upload-prompt" type="file" accept="image/png, image/jpeg">
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
}

.confirmation-buttons {
    flex: 1;
}
.confirmation-buttons button {
    margin-top: auto;
}
</style>
