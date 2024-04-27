<script setup>
</script>

<template>
    <div class="h-full w-full">
        <MapboxMap
          map-id="{ID}"
          class="h-full w-full"
          :options="{
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: [-68.137343, 45.137451], // starting position
            zoom: 5 // starting zoom
          }"
        />

    </div>
</template>