<script setup>
// Get the data from the JSON file
import usePlaces from "~/composables/usePlaces.js";

const menuSelection = ref('places');

const { getAllPlaces, getScheduledPlaces } = usePlaces()


const places = getAllPlaces();

const handleOnClick = (value) => {
    menuSelection.value = value;
}

const computeButtonClass= (target) => {
    return target === menuSelection.value ? 'bg-blue-500 font-bold' : 'bg-gold'
}

</script>

<template>

    <div>
        <div v-if="menuSelection==='places'" class="text-white flex flex-row flex-wrap justify-center">
            <div  v-for="place in getAllPlaces()" :key="place.id" class="">
                <Transition appear>
                    <Card :imageUrl="place.imageUrl" :title="place.title" :content="place.description" class="min-w-96" />
                </Transition>
            </div>
        </div>
        <div v-else>
            <div  v-for="place in getScheduledPlaces()" :key="place.id" class="text-white" >
                <Transition appear>
                    <Card :imageUrl="place.imageUrl" :title="place.title" :content="place.description" />
                </Transition>
            </div>
        </div>
        <div class="fixed bottom-24 text-white w-full mx-auto">
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
