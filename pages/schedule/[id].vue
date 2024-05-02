<script setup>
// get slug from url
import usePlaces from "~/composables/usePlaces.js";
import useDate from "~/composables/useDate.js";
import useFavorite from "~/composables/useFavorite.js";

const { getPlaceById } = usePlaces()
const { getTime, getDate } = useDate();
const { isFavorite, saveFavorite } = useFavorite();

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

const isFav = ref(false);
isFav.value = isFavorite(place.id);

</script>

<template>
  <div class="flex flex-col items-center py-1 px-4 h-full text-white gap-4">
    <div class="flex flex-row gap-4 h-52">
      <img :src="place.imageUrl" alt="" class="object-cover w-1/3 rounded-lg bg-gold">
      <div class="flex flex-col justify-start gap-2">
        <h1 class="text-xl font-bold line-clamp-2">
          {{ place?.title }}
           <span @click="saveFavorite(place.id); isFav = !isFav">
            <i v-if="isFav" class="pi pi-star-fill text-yellow-400"></i>
            <i v-else class="pi pi-star"></i>
          </span>
        </h1>
        <p class="font-bold text-nowrap"><i class="pi pi-clock"></i> {{ place.openingHours }}</p>
        <p class="font-bold line-clamp-2"><i class="pi pi-map-marker"></i> {{ place.address }}</p>
        <div class="flex flex-row">
          <NuxtLink :to="link" :class="`flex flex-col justify-center items-center bg-gold w-1/2 h-14 text-center text-black drop-shadow-md ${!place?.time ? 'rounded-lg w-full' : 'rounded-l-lg'}`">
            <p class="text-xs font-bold">Get directions</p>
            <i class="pi pi-directions text-lg"></i>
          </NuxtLink>
          <div v-if="place?.time" class="flex flex-row justify-center items-center bg-indigo-400 w-1/2 rounded-r-xl text-black gap-2">
            <i class="pi pi-check-circle text-sm"></i>
              <div class="flex flex-col justify-start items-start">
                <p class="text-xs font-bold text-nowrap leading-3">Bókað</p>
                <div class="flex flex-row gap-1 items-center">
                  <p class="text-xs font-semibold ">{{ getDate(place?.time) }}</p>
                  <p class="text-xs font-semibold ">{{ getTime(place?.time) }}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="font-semibold text-lg line-clamp-3 text-center leading-5">{{ place.description }}</p>
    <div class="absolute h-72 w-full bottom-20">
      <LocationOfEvent :place="place" />
    </div>
  </div>

</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
