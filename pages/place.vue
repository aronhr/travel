<script setup>
import useDate from "~/composables/useDate.js";
import usePlaces from "~/composables/usePlaces.js";

const { getAllPlaces } = usePlaces();
const { getTime, getDate } = useDate();
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
        trackUserLocation="true"
          map-id="9989999998989"
          class="h-full"
          :options="{
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: [ longitude, latitude], // starting position
            zoom: zoomLevel, // starting zoom
            trackUserLocation: true
          }"
        >
        <div v-for="place in getAllPlaces()" :key="place.id.toString()+place">
            <MapboxDefaultMarker :markerId="place.id.toString()+place" :lnglat="[place.coordinates.lng, place.coordinates.lat]">
                <MapboxDefaultPopup
                        :popup-id="place.id.toString()+place"
                        :lnglat="[place.coordinates.lng, place.coordinates.lat]"
                        :options="{
                        closeOnClick: true,
                        }"
                    >
                    <div class="flex flex-col w-full h-full">
                        <h1 class="text-black text-lg font-bold">{{ place.title }}</h1>
                        <h3 class="flex flex-row gap-1"><i class="pi pi-clock">  </i>{{ place.openingHours }}</h3>
                        <p>{{ place.description }}</p>
                        <NuxtLink :to="`/schedule/${place.id}`" class="flex justify-center items-center bg-gold w-full h-8 text-center rounded-lg"><i class="pi pi-info text-lg"></i></NuxtLink>
                    </div>
                </MapboxDefaultPopup>
            </MapboxDefaultMarker>
        </div>
        
        <MapboxGeocoder />
        <MapboxNavigationControl />
        <MapboxGeolocateControl position="top-left" trackUserLocation="true"/>
    </MapboxMap>
    </div>
</template>
