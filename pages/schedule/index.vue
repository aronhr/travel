<script setup>
// Get the data from the JSON file
import usePlaces from "~/composables/usePlaces.js";

const { getAllPlaces } = usePlaces()

</script>

<template>
    <div v-for="place in getAllPlaces()" :key="place.title">
        <Card :imageUrl="place.imageUrl" :title="place.title" :content="place.description" />
    </div>
</template>

<style scoped>

</style>
