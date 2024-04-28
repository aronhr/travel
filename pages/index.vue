<script setup>
useHead({
  title: 'Squaretable'
})
// Create a countdown to the flight to edinburgh
const countDownDate = new Date("May 4, 2024 08:35:00").getTime();
const timeToEvent = ref("");

const now = new Date().getTime();
const edinburghArrival = new Date("May 4, 2024 11:50:00").getTime();
const edinburghDeparture = new Date("May 6, 2024 07:30:00").getTime();

// live update of the countdown
const x = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  timeToEvent.value = days + "dagar " + hours + "klst " + minutes + "mín " + seconds + "sek ";
  if (distance < 0) {
    clearInterval(x);
    timeToEvent.value = "EXPIRED";
  }
}, 1000);


</script>

<template>
  <div class="">
    <div class="h-full flex flex-col justify-start text-white">
      <h1 class="text-6xl font-bold w-32 p-8">
        <span v-if="now < edinburghArrival"><p class="text-2xl text-nowrap"><span>Góða ferð til</span></p> Edinborgar</span>
        <span v-else-if="now > edinburghDeparture"><p class="text-2xl text-nowrap"><span>Ekkert spennandi á döfinni</span></p></span>
        <span v-else><p class="text-2xl text-nowrap"><span>Velkominn til</span></p> Edinborgar</span>
      </h1>
      <h1 v-if="timeToEvent !== 'EXPIRED'" class="text-6xl font-bold w-32 px-8 pb-8">
        <p class="text-2xl text-nowrap"><span>{{ timeToEvent }}</span></p>
      </h1>
      <div class="flex flex-col justify-center items-center h-2/3">
        <h3 class="text-xl w-1/2 text-center">Einhver texti Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequuntur officia eveniet officiis dolorum sunt voluptatibus distinctio ut, a inventore repudiandae ratione eaque facere ex ea quia reiciendis voluptatum numquam!</h3>
      </div>
      <img src="../public/landing-page-comp.webp" class="-z-10 fixed w-screen object-bottom blur-sm brightness-50 scale-105"/>
    </div>
  </div>


</template>

<style scoped>

</style>
