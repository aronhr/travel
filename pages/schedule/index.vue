<script setup>
// Get the data from the JSON file
import usePlaces from "~/composables/usePlaces.js";

const { getAllPlaces } = usePlaces()

</script>

<template>
    <div v-for="place in getAllPlaces()" :key="place.id" >
        <Card 
        :place="place"
        />
    </div>
</template>

<style scoped>

</style>
