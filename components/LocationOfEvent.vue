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
</script>

<template>
    <MapboxMap
        map-id="1"
        :options="{
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: [ place.coordinates.lng, place.coordinates.lat], // starting position
            zoom: zoomLevel, // starting zoom
            trackUserLocation: true
          }"
    >
    <MapboxDefaultMarker markerId="2" :lnglat="[place.coordinates.lng, place.coordinates.lat]">
        <MapboxDefaultPopup
                class="text-black"
                popup-id="2"
                :lnglat="[place.coordinates.lng, place.coordinates.lat]"
                :options="{
                closeOnClick: false,
                }"
            >
            <h1 class="text-black text-lg font-bold">
                {{ place.title }}
            </h1>
            <h3>{{ getTime(place.time) }} {{ getDate(place.time) }}</h3>
        </MapboxDefaultPopup>
      </MapboxDefaultMarker>
    </MapboxMap>
</template>

