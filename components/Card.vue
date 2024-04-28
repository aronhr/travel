<template>

    <div class="p-2">
      <div class="  bg-dark justify-between min-h-96 rounded shadow-md flex flex-col bg-landing-pattern bg-cover bg-center p-2">
      	<div class="w-fit bg-dark p-3 border-b border-gray rounded-lg">
            <h2 class="text-lg font-semibold">{{ place.title }}</h2>
        </div>
        <!-- Card Header -->
        <div class="bg-dark p-2 rounded-lg  ">  
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
  
  
  





