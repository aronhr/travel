<script setup lang="ts">
// get slug from url
import usePlaces from "~/composables/usePlaces.js";

const { getPlaceById } = usePlaces()
const route = useRoute()

const placeId = Number(route.params.id)
const place = getPlaceById(placeId); // Get info from data.json by id

// Set head
useHead({
  title: place?.title,
  meta: [
    {
      name: place?.title,
      content: place?.description
    }
  ]
})

</script>

<template>
  <div>
    <h1>{{ place.title }}</h1>
    <p>{{ place.description }}</p>
    <img :src="place?.imageUrl">
  </div>
</template>

<style scoped>

</style>
