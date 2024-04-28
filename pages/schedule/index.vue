<script setup>
useHead({
  title: 'Staðsetingar'
})
// Get the data from the JSON file
import usePlaces from "~/composables/usePlaces.js";

const menuSelection = ref('schedule');

const { getAllPlaces, getScheduledPlaces } = usePlaces()

const handleOnClick = (value) => {
    menuSelection.value = value;
}

const computeButtonClass= (target) => {
    return target === menuSelection.value ? 'bg-gold font-bold' : 'bg-gray'
}

</script>

<template>
    <div class="md:h-screen w-auto bg-dark text-white ">
        <div v-if="menuSelection==='places'" class="flex flex-row flex-wrap justify-center">
            <div  v-for="place in getAllPlaces()" :key="place.id" class="w-96" >
                <Transition appear>
                    <Card :place="place"/>
                </Transition>
            </div>
        </div>
        <div v-else class="flex flex-row flex-wrap justify-center">
            <div  v-for="place in getScheduledPlaces()" :key="place.id"  class="w-96">
                <Transition appear>
                    <Card :place="place"  />
                </Transition>
            </div>
        </div>
        <div class="fixed bottom-24 w-full mx-auto">
            <div class="flex flex-row gap-0 w-52 h-8 justify-cente text-center mx-auto">
                <button class="w-full rounded-l-full transition border-r-2" @click="handleOnClick('schedule')" :class="computeButtonClass('schedule')">Schedule</button>
                <button class="w-full rounded-r-full transition" @click="handleOnClick('places')" :class="computeButtonClass('places')">Places</button>
            </div>
        </div>
    </div>

</template>

<style scoped>
  .v-enter-active {
    animation: swirlAdded 0.3s;
  }
  @keyframes swirlAdded {
    from {
      opacity: 0;
      translate: 0 50px;
      scale: 0.9;
    }
    to {
      translate: 0 0;
      opacity: 1;
      scale: 1;
    }
  }
</style>
