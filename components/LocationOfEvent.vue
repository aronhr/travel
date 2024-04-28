<script setup>
import { ref, defineProps } from 'vue';

const longitude = ref(1); 
const latitude = ref(1);
const zoomLevel = ref(15);

const props = defineProps({
  place: Object // or whatever type you need
});

const getTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('is-IS', { hour: 'numeric', minute: 'numeric', hour12: false });
}

const getDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('is-IS', { weekday: 'long', month: 'long', day: 'numeric' });
}

const link = ref('');

onMounted(() => {
  const isAppleDevice = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  };

  // Check if geolocation is supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const destinationLat = props.place?.coordinates?.lat;
      const destinationLng = props.place?.coordinates?.lng;

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
  <div v-if="link">
    <MapboxMap 
        :map-id="place.id.toString()"
        :options="{
            style: 'mapbox://styles/mapbox/dark-v11', // style URL
            center: [ place.coordinates.lng, place.coordinates.lat], // starting position
            zoom: zoomLevel, // starting zoom
            trackUserLocation: true
          }"
    >
    <MapboxDefaultMarker :markerId="place.id.toString()" :lnglat="[place.coordinates.lng, place.coordinates.lat]">
        <MapboxDefaultPopup
                class="text-black"
                :popup-id="place.id.toString()"
                :lnglat="[place.coordinates.lng, place.coordinates.lat]"
                :options="{
                closeOnClick: false,
                }"
            >
            <div class="flex flex-col w-full h-full">
              <h1 class="text-black text-lg font-bold">
                {{ place.title }}
            </h1>
            <h3>{{ getTime(place.time) }} {{ getDate(place.time) }}</h3>
            <NuxtLink :to="link" class="flex justify-center items-center bg-gold w-8 h-8 text-center rounded-lg"><i class="pi pi-directions text-2xl"></i></NuxtLink>
            </div>
        </MapboxDefaultPopup>
      </MapboxDefaultMarker>
      <MapboxGeolocateControl position="top-left" trackUserLocation="true"/>
    </MapboxMap>
  </div>
    
</template>

