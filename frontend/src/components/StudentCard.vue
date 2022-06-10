<script setup>

defineProps({
    firstName: {
        type: String,
        default: "unavailable",
    },
    lastName: {
        type: String,
        default: "unavailable",
    },
    studentId: {
        type: String,
        default: "unavailable",
    },
    studentPhoto: {
        type: String,
        default: "",
    },
});
</script>

<template>
    <div class="id-card">
        <div class="id-card-top">
            <img src="/assets/uni_logo.png" />
        </div>

        <div class="id-card-main">
            <p class="id-details">
                <span>First Name:</span><br />
                <b>{{ firstName }}</b
                ><br /><br />

                <span>Last Name:</span><br />
                <b>{{ lastName }}</b
                ><br /><br />

                <span>Student ID:</span><br />
                <b>a{{ studentId }}</b>
            </p>
            <img class="id-photo" :src="studentPhoto" />
        </div>
    </div>
</template>

<style scoped>
.id-card {
    height: 256px;
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
    border-radius: 5px;
    background-color: white;
    color: #363636;
}

.id-card-top {
    height: 48px;

    background: #141d2b;
    border-radius: 5px 5px 0px 0px;

    border-bottom: 2px solid hsl(0, 100%, 42%);
}

.id-card-top img {
    height: 46px;
    margin-left: 8px;
}

.id-card-main {
    display: flex;
    margin: 16px;
}

.id-details {
    font-size: 16px;
    flex: 1;
    line-height: 18px;
}

.id-details span {
    font-size: 14px;
}

.id-photo {
    flex: 1;
    width: 124px;
    height: 176px;
    background-color: #e5e5e5;
    object-fit: cover;
}
</style>
