<script setup lang="ts">
// get slug from url
const route = useRoute()

console.log(route.params.id);
import usePlaces from "~/composables/usePlaces.js";

const { getPlaceById } = usePlaces()

const placeId = Number(route.params.id)

// Get info from data.json by id
const place = getPlaceById(placeId);
console.log(place)

</script>

<template>
  <div>
    <h1>{{ place }}</h1>
  </div>
</template>

<style scoped>

</style>
