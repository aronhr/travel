<script setup>
// get slug from url
import usePlaces from "~/composables/usePlaces.js";


const { getPlaceById } = usePlaces()
const { isApple } = useDevice();
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

const getTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('is-IS', { hour: 'numeric', minute: 'numeric', hour12: false });
}

const openMaps = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      if /* if we're on iOS, open in Apple Maps */
      (isApple){
        window.open(`https://maps.apple.com/maps?saddr==${position.coords.latitude},${position.coords.longitude}&daddr=${place?.coordinates.lat},${place?.coordinates.lng}`)
      }
      else /* else use Google */
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${position.coords.latitude},${position.coords.longitude}&destination=${place?.coordinates.lat},${place?.coordinates.lng}&travelmode=walking`);

    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

</script>

<template>
  <div class="flex flex-col items-center py-10 px-4 h-full bg-dark text-white">
    <div class="flex flex-row gap-4">
      <img src="../../public/landing-image.jpeg" alt="" class="object-fill w-1/3 rounded-lg bg-gold">
      <div class="flex flex-col justify-start">
        <h1 class="text-2xl font-bold">{{ place?.title }}</h1>
        <h2 class="text-lg font-semibold " v-if="place?.time">{{ getTime(place?.time) }}</h2>
        <h2 class="text-lg" v-else>No schedule</h2>
      </div>
    </div>
    <div class="flex flex-col justify-start items-start w-full">
      <p>{{ place.description }}</p>
      <button class="bg-gold w-full" @click="openMaps()">{{ place?.location }}</button>
    </div>
  </div>
</template>

<style scoped>

</style>
