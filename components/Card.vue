<script setup>


</script>

<template>
    <div class="flex flex-col  p-2">
    <div class="bg-gold rounded shadow-md p-2">
      <!-- Card Header -->
      <div class="border-b border-gray p-3 rounded-t">
        <h2 class="text-lg font-semibold">Title of the Card</h2>
      </div>
  
      <!-- Card Body -->
      <div class="p-3">
        <p>Content of the card goes here.</p>
      </div>
  
      <!-- Card Footer -->
      <div class="border-t border-gray p-3 rounded-b">
        <div class="flex justify-end">
          <button class="px-3 py-2 bg-dark text-white rounded-md">Location</button>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  
  <script>
  export default {
    props: {
      title: String
    }
  }
  </script>
  
  
  





