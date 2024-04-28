<template>
  <NuxtLink :to="`/schedule/${place.id}`">
    <div class="p-2">
      <div class="  bg-dark justify-between min-h-96 rounded shadow-md flex flex-col p-2 bg-cover bg-center" :style="{ 'background-image': 'url('+ place.imageUrl +')' }">
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
          <div class="border-t border-gray p-3 rounded-b flex flex-row justify-between">
            <p class="px-3 py-2">{{ place.time }}</p>
            <p class="px-3 py-2">{{ place.location }}</p> 
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>   
</template>
  
  <script>

  export default {
    props: {
      place: Object
    }
  };
  </script>
  
  
  





