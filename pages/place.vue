<script setup>
import { ref } from 'vue';

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

const data = {

}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-1/3 w-full">
        <div class="h-1/3">data</div>
        <MapboxMap
        trackUserLocation="true"
          map-id="2"
          class="h-full"
          :options="{
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: [ longitude, latitude], // starting position
            zoom: zoomLevel, // starting zoom
            trackUserLocation: true
          }"
        >
        <MapboxDefaultMarker markerId="2" :lnglat="[100, -10]">
            <MapboxDefaultPopup
                    popup-id="2"
                    :lnglat="[100, 0]"
                    :options="{
                    closeOnClick: false,
                    }"
                >
                <h1 class="test">
                    Hello World!
                </h1>
            </MapboxDefaultPopup>
        </MapboxDefaultMarker>
        <MapboxGeocoder />
        <MapboxNavigationControl />
        <MapboxGeolocateControl position="top-left" trackUserLocation="true"/>
    </MapboxMap>
    </div>
</template>