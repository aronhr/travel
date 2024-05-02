<script setup>
import usePlaces from "~/composables/usePlaces.js";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

import {MapboxMap, MapboxMarker, MapboxGeolocateControl, MapboxGeocoder } from '@studiometa/vue-mapbox-gl';

const runtimeConfig = useRuntimeConfig()

const mbKey = runtimeConfig.public.mb_key

const { getAllPlaces } = usePlaces();

useHead({
  title: 'Kort'
})

const longitude = ref(1); // Default longitude
const latitude = ref(1); // Default latitude
const zoomLevel = ref(15);

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        longitude.value = position.coords.longitude;
        latitude.value = position.coords.latitude;
    }, error => {
        console.error("Error obtaining location:", error);
        longitude.value = -19.0211697
        latitude.value = 64.9312762
        zoomLevel.value = 6
    });
} else {
    console.error("Geolocation is not supported by this browser.");
}
</script>

<template>
    <div class="absolute bottom-20 h-[calc(100vh-10rem)] w-full">
        <MapboxMap
            :accessToken="mbKey"
            mapStyle="mapbox://styles/mapbox/standard"
            :center="[longitude, latitude]"
            class="h-full w-full"
            :zoom="zoomLevel"
        >
        <MapboxGeocoder />
        <MapboxGeolocateControl :showUserHeading="true" position="top-left"/>
        <div v-for="place in getAllPlaces()" :key="place.id.toString()">
            <MapboxMarker :lng-lat="[place.coordinates.lng, place.coordinates.lat]" :offset="[0, 25]" popup>
                <template v-slot:popup>
                    <div class="flex flex-col w-full h-full">
                        <h1 class="text-black text-lg font-bold">{{ place.title }}</h1>
                        <h3 class="flex flex-row gap-1"><i class="pi pi-clock">  </i>{{ place.openingHours }}</h3>
                        <p>{{ place.description }}</p>
                        <NuxtLink :to="`/schedule/${place.id}`" class="flex justify-center items-center bg-gold w-full h-8 text-center rounded-lg font-bold gap-2"><i class="pi pi-info-circle text-sm"></i>Info</NuxtLink>
                    </div>
                </template>
            </MapboxMarker>
        </div>

    </MapboxMap>
    </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
