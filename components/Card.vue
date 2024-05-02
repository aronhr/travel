<template>
  <nuxt-link :to="`/schedule/${place.id}`">
    <div class="p-2 ">
      <div class="grid grid-cols-3 grid-rows-3 gap-1  bg-dark min-h-96 rounded-xl shadow-md p-2 bg-cover bg-center" :style="{ 'background-image': 'url('+ place.imageUrl +')' }">
      	<div class="col-start-3 row-start-1 justify-self-end p-2">
          <h2 class="text-lg font-semibold"><i class="pi pi-star"></i></h2>
        </div>
        <div class="w-fit bg-dark bg-opacity-70 max-w-60 p-3 rounded-lg col-span-2 justify-self-start row-start-1">
            <h2 class="text-lg font-semibold truncate">{{ place.title }}</h2>
        </div>

        <!-- Card Header -->
        <div class="bg-dark bg-opacity-70 p-2 rounded-lg row-start-4 col-span-3 justify-self-stretch">
          <!-- Card Body -->
          <div class="p-3 col-span-3">
            <p class="line-clamp-3 italic font-semibold">{{ place.description }}</p>
          </div>
          <!-- Card Footer -->
          <div class="grid grid-cols-3 p-3 font-bold">
            <div class="px-3 py-2 col-start-1">
              <div class="flex flex-row items-center gap-2">
                <i class="pi pi-clock"></i>
                <div>
                  <p>{{ getTime(place.time) }}</p>
                  <p>{{ getDate(place.time) }}</p>
                </div>
              </div>
            </div>
            <div class="px-1 py-1 line-clamp-2 col-start-2 col-span-2">
              <div class="flex flex-row h-full items-center gap-2">
                <i class="pi pi-map-marker"></i>{{ place.address }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
  import useDate from "~/composables/useDate.js";
  const { getTime, getDate } = useDate();
  const props = defineProps ({
  place: Object
  })
</script>

<style scoped>

</style>
