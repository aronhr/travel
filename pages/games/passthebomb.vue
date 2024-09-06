<script setup lang="ts">
import { ref } from 'vue';

useHead({
  title: 'Pass the Bomb',
  meta: [
    {
      name: 'description',
      content: 'A fun drinking game where players pass a bomb around and try to avoid being the last one holding it.'
    }
  ]
});

// Categories for the game
const categories = ref([
  'Types of Beer', 'Movie Titles', 'Countries', 'Fruits', 'Car Brands', 'Colors', 'Animals',
  'Pizza Toppings', 'Musical Instruments', 'Board Games', 'Actors', 'Sports Teams', 'Books',
  'Cities', 'TV Shows', 'Superheroes', 'Drinks', 'Languages', 'Hobbies', 'Jobs'
]);

// Game state
const bombTime = ref(10); // Initial bomb timer (will be randomized)
const isBombActive = ref(false); // Tracks if the bomb is currently active
const currentCategory = ref('');
const timerInterval = ref(null);
const gameLoser = ref('');

// Randomize the bomb timer between a range (e.g., 5-15 seconds)
const randomizeBombTime = () => {
  bombTime.value = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Random between 5 and 15 seconds
};

// Start the bomb timer
const startBomb = () => {
  if (!isBombActive.value) {
    randomizeBombTime();
    currentCategory.value = categories.value[Math.floor(Math.random() * categories.value.length)]; // Pick a random category
    isBombActive.value = true;
    gameLoser.value = '';

    timerInterval.value = setInterval(() => {
      bombTime.value--;

      // If the bomb reaches zero, the current player loses
      if (bombTime.value <= 0) {
        clearInterval(timerInterval.value);
        handleBombExplosion();
      }
    }, 1000); // Count down each second
  }
};

// Handle bomb explosion (current player loses)
const handleBombExplosion = () => {
  clearInterval(timerInterval.value);
  isBombActive.value = false;
  gameLoser.value = 'The bomb exploded! You drink!';
};

// Reset the game for the next round
const resetGame = () => {
  bombTime.value = 10;
  gameLoser.value = '';
  isBombActive.value = false;
};

</script>

<template>
  <div class="h-full bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-10">Pass the Bomb (Drinking Version)</h1>

    <!-- Show the current category -->
    <div v-if="isBombActive" class="text-center mb-6">
      <h2 class="text-2xl">Category: {{ currentCategory }}</h2>
    </div>

    <!-- Bomb timer display -->
    <div class="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-4xl font-bold">
      {{ bombTime }}
    </div>

    <!-- Action button to start the game -->
    <button
        v-if="!isBombActive && !gameLoser"
        @click="startBomb"
        class="bg-blue-500 text-white px-6 py-2 mt-6 rounded-lg hover:bg-blue-600 transition"
    >
      Start the Bomb
    </button>

    <!-- Show when the game is over -->
    <div v-if="gameLoser" class="text-center mt-8">
      <h2 class="text-4xl font-bold text-red-500 mb-4">{{ gameLoser }}</h2>
      <button @click="resetGame" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
        Play Again
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Add additional styles here if needed */
</style>
