<template>
    <div class="manual-add-page">
        <p>Create an account for Adelaide ID here. Avoid re-using your MyUni passord.</p>
        <div>
            <label><b>Staff / Student ID</b></label>
            <input type="text">
        </div>
        <div>
            <label><b>Password</b></label>
            <input type="text">
        </div>
        <div>
            <label><b>Confirm Password</b></label>
            <input type="text">
        </div>
        <div>
            <label><b>Canvas Bearer Token</b></label>
            <p>Head over to your <a href="https://myuni.adelaide.edu.au/profile/settings">MyUni Settings</a> and under 'approved integrations' select 'new access token' to generate your bearer token.</p>
            <input type="text">
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
