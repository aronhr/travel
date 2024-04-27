<template>
    <div class="flex flex-col p-2">
      <div class="bg-dark rounded shadow-md p-2">
        <!-- Card Image -->
        <div v-if="imageUrl" class="p-3">
            <img :src="imageUrl" class="rounded-t w-13 h-12">
        </div>
        <!-- Card Header -->
        <div class="border-b border-gray rounded-t">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
        </div>
  
        <!-- Card Body -->
        <div class="p-3">
          <p>{{ content }}</p>
        </div>
  
        <!-- Card Footer -->
        <div class="border-t border-gray p-3 rounded-b">
          <div class="flex justify-end">
            <button class="px-3 py-2 bg-dark text-white rounded-md"><i class='pi pi-map-marker'></i></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imageUrl: String,
      title: String,
      content: String,
    }
  };
  </script>
  
  
  





