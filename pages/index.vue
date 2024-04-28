<script setup>

// If user is located in Iceland set variable to false else set to true
const isIceland = ref(false);
const locationAllowed = ref(false);
// Get user location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// If location is in Iceland set variable to true
const showPosition = (position) => {
  if (position.coords.latitude > 63.5 && position.coords.latitude < 66.5 && position.coords.longitude > -24.5 && position.coords.longitude < -13.5) {
    isIceland.value = true;
  }
}

getLocation();



</script>

<template>
  <div class="">
    <div class="h-full flex flex-col justify-start text-white">
      <h1 class="text-6xl font-bold w-32 p-8"><p class="text-2xl text-nowrap">Velkomnir til </p> <span v-if="isIceland">Íslands</span> <span v-else>Edinborgar</span></h1>
      <div class="flex flex-col justify-center items-center h-2/3">
        <h3 class="text-xl w-1/2 text-center">Einhver texti Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequuntur officia eveniet officiis dolorum sunt voluptatibus distinctio ut, a inventore repudiandae ratione eaque facere ex ea quia reiciendis voluptatum numquam!</h3>
      </div>
      <img src="../public/landing-page-comp.webp" class="-z-10 fixed w-screen object-bottom blur-sm brightness-50 scale-105"/>
  </div>
  </div>


</template>

<style scoped>

</style>
