<template>
    <div class="student-card">
        <div class="student-card-top">
            <img src="/assets/uni_logo.png" />
        </div>

        <img class="id-photo" src="" />
    </div>
</template>

<style scoped>
.student-card {
    height: 256px;
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
    border-radius: 5px;
}

.student-card-top {
    height: 48px;

    background: #141D2B;
    border-radius: 5px 5px 0px 0px;

    border-bottom: 2px solid hsl(0, 100%, 42%);
}

.student-card-top img {
    height: 46px;
    margin-left: 8px;
}

.id-photo {
    width: 124px;
    height: 176px;
    background-color: #E5E5E5;
    margin: 16px;
}
</style>