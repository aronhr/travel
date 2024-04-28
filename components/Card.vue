<template>
    <div class="flex flex-col p-2">
      <div class="bg-dark rounded shadow-md p-2">
        <!-- Card Image -->
        <div v-if="place.imageUrl" class="p-3">
            <img :src="place.imageUrl" class="rounded-t w-13 h-12">
        </div>

        <!-- Card Header -->
        <div class="border-b border-gray rounded-t">
          <h2 class="text-lg font-semibold">{{ place.title }}</h2>
        </div>
  
        <!-- Card Body -->
        <div class="p-3">
          <p>{{ place.description }}</p>
        </div>
  
        <!-- Card Footer -->
        <div class="border-t border-gray p-3 rounded-b">
          <div class="flex justify-end">
            <NuxtLink :to="`/schedule/${place.id}`"><button class="px-3 py-2 bg-dark text-white rounded-md"><i class='pi pi-map-marker'></i></button></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import Place from '~/pages/place.vue';

  export default {
    props: {
      place: Object
    }
  };
  </script>
  
  
  





