<script setup lang="ts">
import { ref } from 'vue';

// Predefined categories
const categories = ref([
  'Types of Beer', 'Movie Titles', 'Countries', 'Fruits', 'Car Brands', 'Colors', 'Sports Teams',
  'Board Games', 'Animals', 'Pizza Toppings', 'Musical Instruments', 'Video Games', 'Books',
  'Actors', 'Songs', 'Languages', 'Cities', 'TV Shows', 'Superheroes', 'Jobs',
  'Fast Food Restaurants', 'Countries in Europe', 'Dog Breeds', 'Famous Landmarks', 'Olympic Sports',
  'Car Parts', 'Things in Space', 'Vegetables', 'Shoe Brands', 'Ice Cream Flavors', 'App Names',
  'Hobbies', 'Genres of Music', 'Outdoor Activities', 'Seasons', 'Modes of Transportation',
  'Planets', 'Comic Book Characters', 'Famous Authors', 'Historical Events', 'Famous Athletes',
  'Cooking Ingredients', 'Desserts', 'Board Games', 'Famous Paintings', 'Drinks', 'Tools',
  'Insects', 'Weather Phenomena', 'Languages Spoken in Africa', 'Bird Species', 'Flowers',
  'Movie Genres', 'Sea Creatures', 'Marvel Characters', 'DC Characters', 'Mythological Creatures',
  'Famous Movies from the 90s', 'Fashion Designers', 'Comedy Movies', 'Dance Styles', 'Famous Songs',
  'Furniture Types', 'Household Appliances', 'Smartphone Brands', 'Programming Languages'
]);

// Game state
const players = ref([{ name: '', hesitated: false }]);
const currentPlayerIndex = ref(0);
const currentCategory = ref('');
const timer = ref(10);
const timerInterval = ref(null);
const isGameStarted = ref(false);
const gameLoser = ref('');
const isPlayerTurn = ref(false);

// Add and remove players
const addPlayer = () => {
  players.value.push({ name: '', hesitated: false });
};

const removePlayer = (index) => {
  players.value.splice(index, 1);
};

// Start the game
const startGame = () => {
  if (players.value.length < 2 || players.value.some(player => !player.name.trim())) {
    alert('Please enter valid player names!');
    return;
  }
  resetGame();
  isGameStarted.value = true;
  nextRound();
};

// Reset the game
const resetGame = () => {
  currentPlayerIndex.value = 0;
  gameLoser.value = '';
  players.value.forEach(player => {
    player.hesitated = false;
  });
};

// Generate a random category
const nextRound = () => {
  const randomIndex = Math.floor(Math.random() * categories.value.length);
  currentCategory.value = categories.value[randomIndex];
  currentPlayerIndex.value = 0;
  startTimer();
};

// Start the turn timer
const startTimer = () => {
  timer.value = 10;
  clearInterval(timerInterval.value);
  isPlayerTurn.value = true;

  timerInterval.value = setInterval(() => {
    timer.value--;

    if (timer.value <= 0) {
      // Player hesitated
      handleHesitation();
    }
  }, 1000);
};

// Handle when a player hesitates
const handleHesitation = () => {
  clearInterval(timerInterval.value);
  players.value[currentPlayerIndex.value].hesitated = true;
  gameLoser.value = players.value[currentPlayerIndex.value].name;
  isPlayerTurn.value = false;
  isGameStarted.value = false;
};

// Move to the next player
const nextPlayer = () => {
  if (!players.value.some(player => !player.hesitated)) {
    return endRound();
  }

  currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.value.length;
  if (players.value[currentPlayerIndex.value].hesitated) {
    nextPlayer(); // Skip players who already hesitated
  } else {
    startTimer();
  }
};

// Player taps button after saying a word
const submitTurn = () => {
  clearInterval(timerInterval.value);
  nextPlayer();
};

// End the round and determine the loser
const endRound = () => {
  clearInterval(timerInterval.value);
  isGameStarted.value = false;
};

</script>

<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-10">Category Game</h1>

    <!-- Player Input -->
    <div v-if="!isGameStarted && !gameLoser" class="w-full max-w-lg mb-8">
      <h2 class="text-2xl font-bold mb-4">Enter Players</h2>
      <div v-for="(player, index) in players" :key="index" class="mb-2 flex items-center">
        <input
            v-model="player.name"
            type="text"
            placeholder="Enter player name"
            class="bg-gray-200 text-black px-3 py-2 rounded-md w-full"
        />
        <button @click="removePlayer(index)" class="bg-red-500 text-white px-2 py-1 rounded-md ml-2">X</button>
      </div>
      <button @click="addPlayer" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Add Player
      </button>
      <button @click="startGame" class="bg-green-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-green-600 transition">
        Start Game
      </button>
    </div>

    <!-- Game Area -->
    <div v-if="isGameStarted" class="w-full max-w-lg text-center">
      <h2 class="text-2xl font-bold mb-4">Category: {{ currentCategory }}</h2>
      <p class="text-5xl font-bold">Current Player: {{ players[currentPlayerIndex].name }}</p>
      <p class="text-lg mt-2">Time Left: {{ timer }}s</p>

      <!-- Button to submit turn -->
      <div class="mt-6">
        <button
            @click="submitTurn"
            class="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
        >
          Tap to Confirm
        </button>
      </div>
    </div>

    <!-- Game Results -->
    <div v-if="gameLoser" class="text-center mt-8">
      <h2 class="text-4xl font-bold text-red-500 mb-4">{{ gameLoser }} hesitated or repeated! 🍺</h2>
      <button @click="resetGame" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
        Play Again
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
