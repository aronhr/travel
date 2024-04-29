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
  <div class="flex flex-col items-center py-1 px-4 h-full text-white gap-4">
    <div v-if="place?.time" class="flex flex-row items-center bg-indigo-400 min-w-60 max-w-96 h-10 rounded-xl text-black px-6 py-10 gap-5">
      <i class="pi pi-info-circle text-3xl"></i>
      <div class="flex flex-col justify-start items-start">
        <p class="font-bold text-2xl">Bókun afgreidd</p>
        <div class="flex flex-row gap-2 items-center">
          <p class="text-lg font-semibold ">{{ getDate(place?.time) }}</p>
          <p class="text-lg font-semibold ">{{ getTime(place?.time) }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-4 h-52">
      <img :src="place.imageUrl" alt="" class="object-cover w-1/2 rounded-lg bg-gold">
      <div class="flex flex-col justify-start gap-2">
        <h1 class="text-2xl font-bold">{{ place?.title }}</h1>
        <p class="font-bold"><i class="pi pi-clock "></i> {{ place.openingHours }}</p>
        <p class="font-bold"><i class="pi pi-map-marker"></i> {{ place.address }}</p>
        <NuxtLink :to="link" class="flex flex-col justify-center items-center bg-gold w-full h-14 text-center rounded-lg text-black">
          <p class="text-xs font-bold">Get directions</p>
          <i class="pi pi-directions text-3xl"></i>
        </NuxtLink>
      </div>
    </div>
    <p class="font-semibold text-lg line-clamp-3 text-center">{{ place.description }}</p>
    <div class="absolute h-64 w-full bottom-20">
      <LocationOfEvent :place="place" />
    </div>
  </div>

</template>

<style scoped>

</style>
