<template>
    <div class="flex flex-col p-2 text-white">
      <div class="card   bg-landing-pattern  bg-opacity-75 bg-left-top rounded shadow-md p-2" >
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
          <div class="flex flex-row w-full">
            <div class="flex flex-row justify-between items-center w-full">
              <p class="px-3 py-3">{{ place.time }}</p>
              <p>{{ place.location }}</p>
            </div>
            <div class="flex flex-row justify-end mr-auto">
              <button class="px-3 py-2 bg-dark text-white rounded-md"><i class='pi pi-map-marker'></i></button>

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
      place: Object,
    }
  };
  </script>
  
  
  





