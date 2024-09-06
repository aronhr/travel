<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-20">Games</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <router-link
          to="/games/powerhour"
          class="bg-blue-500 text-white py-4 text-center rounded-lg hover:bg-blue-600 transition duration-300">
        Power Hour
      </router-link>
      <router-link
          to="/games/kingscup"
          class="bg-green-500 text-white py-4 text-center rounded-lg hover:bg-green-600 transition duration-300">
        Kings Cup
      </router-link>
      <router-link
          to="/games/spinthebottle"
          class="bg-purple-500 text-white py-4 text-center rounded-lg hover:bg-purple-600 transition duration-300">
        Spin the Bottle
      </router-link>
      <router-link
          to="/games/quizgame"
          class="bg-red-500 text-white py-4 text-center rounded-lg hover:bg-red-600 transition duration-300">
        Quiz Game
      </router-link>
      <router-link
          to="/games/dringroulette"
          class="bg-yellow-500 text-white py-4 text-center rounded-lg hover:bg-yellow-600 transition duration-300">
        Drink Roulette
      </router-link>
      <!-- <router-link
          to="/games/beerpongchallenge"
          class="bg-pink-500 text-white py-4 text-center rounded-lg hover:bg-pink-600 transition duration-300">
        Beer Pong Challenge
      </router-link> -->
      <router-link
          to="/games/neverhaveiever"
          class="bg-indigo-500 text-white py-4 text-center rounded-lg hover:bg-indigo-600 transition duration-300">
        Never Have I Ever
      </router-link>
      <router-link
          to="/games/flipcup"
          class="bg-teal-500 text-white py-4 text-center rounded-lg hover:bg-teal-600 transition duration-300">
        Flip Cup Countdown
      </router-link>
      <router-link
          to="/games/categorygame"
          class="bg-orange-500 text-white py-4 text-center rounded-lg hover:bg-orange-600 transition duration-300">
        Category Game
      </router-link>
      <router-link
          to="/games/dicedrinkinggame"
          class="bg-gray-500 text-white py-4 text-center rounded-lg hover:bg-gray-600 transition duration-300">
        Dice Drinking Game
      </router-link>
      <router-link
          to="/games/passthebomb"
          class="bg-cyan-500 text-white py-4 text-center rounded-lg hover:bg-cyan-600 transition duration-300">
        Pass the Bomb
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* No additional styles needed since Tailwind handles the layout and styles */
</style>
