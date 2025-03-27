<script setup>
useHead({
  title: 'Squaretable'
})
// Create a countdown to the flight to edinburgh
const countDownDate = new Date("April 3, 2025 20:30:00").getTime();
const timeToEvent = ref("");

const now = new Date().getTime();
const edinburghArrival = new Date("April 4, 2025 04:40:00").getTime();
const edinburghDeparture = new Date("April 6, 2024 19:30:00").getTime();

// live update of the countdown
const x = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  timeToEvent.value = days + " dagar " + hours + " klst " + minutes + " mín " + seconds + " sek ";
  if (distance < 0) {
    clearInterval(x);
    timeToEvent.value = "EXPIRED";
  }
}, 1000);
</script>

<template>
  <Transition name="page">
    <div class="h-full flex flex-col justify-start text-white">
      <h1 class="text-6xl font-bold w-32 p-8">
        <span v-if="now < edinburghArrival"><p class="text-2xl text-nowrap"><span>Góða ferð til</span></p> Warsaw</span>
        <span v-else-if="now > edinburghDeparture"><p class="text-2xl text-nowrap"><span>Ekkert spennandi á döfinni</span></p></span>
        <span v-else><p class="text-2xl text-nowrap"><span>Velkominn til</span></p> Warsaw</span>
      </h1>
      <h1 v-if="timeToEvent !== 'EXPIRED'" class="text-6xl font-bold w-32 px-8 pb-8">
        <p class="text-2xl text-nowrap text-center"><span>{{ timeToEvent }}</span></p>
      </h1>
      <div class="flex flex-col justify-center items-start p-8 h-2/3">
        <h3 class="text-xl font-semibold w-6/7 text-start">
          Stígum saman inn í ævintýrið sem bíður okkar í hjarta
          Skotlands, þar sem sögur og saga lifna við í hinni göfugu
          Edinborg. Í þessari helgarferð munum við kafa djúpt í
          ríkulega menningu og dularfulla sögu þessarar fornu
          borgar, og upplifa allt það besta sem hún hefur upp á að
          bjóða
        </h3>
      </div>
      <img src="../public/landing-page-comp.webp" class="-z-10 fixed w-screen object-bottom blur-sm brightness-50 scale-105" />
    </div>
</Transition>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {

  opacity: 0;
}
</style>
