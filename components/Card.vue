<template>
  <NuxtLink :to="`/schedule/${place.id}`">
    <div class="p-2 relative">
      <div class="grid grid-cols-3 grid-rows-3 gap-1 min-h-96 rounded-xl shadow-md p-2 z-10">
      	<div class="bg-dark z-10 bg-opacity-70 p-2 rounded-lg col-start-3 row-start-1 w-10 justify-self-end flex items-center justify-center flex-row">
          <h2 class="text-lg font-semibold" @click="saveFavorite(place.id); isFav = !isFav">
            <i v-if="isFav" class="pi pi-star-fill text-yellow-400"></i>
            <i v-else class="pi pi-star"></i>
          </h2>
        </div>
        <div class="w-fit bg-dark z-10 bg-opacity-70 max-w-60 p-3 rounded-lg col-span-2 justify-self-start row-start-1 flex items-center">
            <h2 class="text-lg z-10 font-semibold truncate">{{ place.title }}</h2>
        </div>
        <!-- Card Header -->
        <div class="bg-dark z-10 bg-opacity-70 p-2 rounded-lg row-start-4 col-span-3 justify-self-stretch">
          <!-- Card Body -->
          <div class="p-3 col-span-3">
            <p class="line-clamp-2 italic font-medium">{{ place.description }}</p>
          </div>
          <!-- Card Footer -->
          <div class="grid grid-cols-3 p-3 font-bold">
            <div class="col-span-1 flex flex-row items-center gap-2" v-if="place.time">
              <i class="pi pi-clock"></i>
              <div class="flex flex-col">
                <p class="">{{ getTime(place.time) }}</p>
                <p class="">{{ getDate(place.time) }}</p>
              </div>
            </div>
            <div :class="`px-1 py-1 flex flex-row items-center gap-2 ${place.time ? 'col-start-2 col-span-2' : 'col-span-3'}`">
              <i class="pi pi-map-marker" />
              <p class="line-clamp-1">{{ place.address }}</p>
            </div>
          </div>
        </div>
      </div>
      <img :src=place.imageUrl class="p-1 rounded-2xl absolute inset-0 w-full h-full object-cover -z-9">
    </div>
  </NuxtLink>
</template>

<script setup>
import useDate from "~/composables/useDate.js";
import useFavorite from "~/composables/useFavorite.js";
const { getTime, getDate } = useDate();
const props = defineProps ({
  place: Object
})

const { isFavorite, saveFavorite } = useFavorite();

const isFav = ref(false);
isFav.value = isFavorite(props.place.id);

</script>
