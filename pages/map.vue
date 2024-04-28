<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useMapboxRef } from "#imports";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const style = ref('mapbox://styles/mapbox/standard');
const mapRef = useMapboxRef('map2');
const navigationState = reactive({
  isNavigating: false
});

// Initialize directions control
let directions;

onMounted(() => {
  if (mapRef.value) {
    directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken, // Ensure your access token is correctly set
      unit: 'metric',
      profile: 'mapbox/walking',
    });

    mapRef.value.addControl(directions, 'top-left');
  }
});

const startNavigation = () => {
  navigationState.isNavigating = true;
  // Change the profile to driving for real-time navigation, if appropriate
  directions.setProfile('mapbox/driving');
  console.log('Navigation started');
};

// Function to handle user geolocation and set map center
const geolocate = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    mapRef.value.setCenter([position.coords.longitude, position.coords.latitude]);
    mapRef.value.setZoom(12);
    directions.setOrigin([position.coords.longitude, position.coords.latitude]); // Set current position as start point
    if (navigationState.isNavigating) {
      directions.setProfile('mapbox/driving');
    }
  });
};

geolocate();
</script>

<template>
  <div>
    <MapboxMap
        map-id="map2"
        style="top: 0"
        :options="{
          style,
          center: [-19.025970, 65.036490], // starting position [lng, lat]
          zoom: 5, // starting zoom
        }"
        :style="{
          height: `95vh`
        }"
        @styleload="() => { console.log('style loaded') }"
    >
      <MapboxAttributionControl />
      <MapboxScaleControl />
      <MapboxNavigationControl />
      <MapboxFullscreenControl />
      <MapboxGeolocateControl />
    </MapboxMap>
  </div>
</template>

<style scoped>
</style>
