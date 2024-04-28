<script setup>
// get slug from url
import usePlaces from "~/composables/usePlaces.js";
import useDate from "~/composables/useDate.js";


const { getPlaceById } = usePlaces()
const { getTime, getDate } = useDate();
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

const link = ref('');

onMounted(() => {
  const isAppleDevice = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  };

  // Check if geolocation is supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const destinationLat = place?.coordinates?.lat;
      const destinationLng = place?.coordinates?.lng;

      // Ensure place coordinates are defined
      if (destinationLat == null || destinationLng == null) {
        console.error("Destination coordinates are not defined.");
        return;
      }

      // Open the relevant maps application based on the device
      if (isAppleDevice()) {
        link.value = `https://maps.apple.com/maps?saddr=${latitude},${longitude}&daddr=${destinationLat},${destinationLng}`
      } else {
        link.value = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destinationLat},${destinationLng}&travelmode=walking`
      }
    }, () => {
      link.value = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    });
  } else {
    link.value = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }
})

</script>

<template>
  <div class="flex flex-col items-center py-10 px-4 h-full bg-dark text-white">
    <div class="flex flex-row gap-4">
      <img :src="place.imageUrl" alt="" class="object-fill w-1/3 rounded-lg bg-gold">
      <div class="flex flex-col justify-start">
        <h1 class="text-2xl font-bold">{{ place?.title }}</h1>
        <h2 class="text-lg font-semibold " v-if="place?.time">{{ getTime(place?.time) }}</h2>
        <h2 class="text-lg font-semibold " v-if="place?.time">{{ getDate(place?.time) }}</h2>
        <h2 class="text-lg" v-else>No schedule</h2>
        <NuxtLink :to="link" class="flex justify-center items-center bg-gold w-8 h-8 text-center rounded-lg"><i class="pi pi-directions text-2xl"></i></NuxtLink>
      </div>
    </div>
    <div class="absolute h-80 w-80 bottom-24">
      <LocationOfEvent :place="place" />
    </div>

  </div>

</template>

<style scoped>

</style>
