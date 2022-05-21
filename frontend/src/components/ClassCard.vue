<script setup>
    defineProps({
        title: {
            type: String,
            default: "",
        },
        details: {
            type: String,
            default: "",
        },
    });
</script>

<template>
    <div class="card">
        <div class="card-heading">
            <div class="card-text">
                <h2>{{ title }}</h2>
            </div>
        </div>
        <div>
            <div class="card-text">
                <p>{{ details }}</p>
            </div>
        </div>
        <div class="navigation">
            <button style="flex-grow: 1;">Hello</button>
            <button style="flex-grow: 2;">Hello</button>
        </div>
    </div>
</template>

<style scoped>
    .card {
        display: flex;
        flex-direction: column;

        border: 2px solid black;
        border-radius: 5px;
        height: 176px;
        padding: 16px;
        margin-bottom: 16px;
    }

    .card button {
        border: 2px solid black;
        border-radius: 20px;
    }

    .card-text {
        display: table-cell;
        vertical-align: middle;
        font-size: 16px;
        height: 28px;
    }

    .card-heading {
        margin-bottom: 8px;
    }

    .navigation {
        display: flex;
        gap: 16px;
        margin-top: auto;
    }

    .navigation button {
        height: 28px;
    }
</style>