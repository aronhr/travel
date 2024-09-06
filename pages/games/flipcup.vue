<script setup lang="ts">
import { ref } from 'vue';

// Game State
const players = ref([{ name: '', time: 0, flipped: false }]);
const currentPlayerIndex = ref(0);
const currentPlayer = ref('');
const timer = ref(0);
const timerInterval = ref(null);
const isGameStarted = ref(false);
const isCupFlipped = ref(false);
const gameWinner = ref('');
const gameLoser = ref('');
const currentRotation = ref(0); // Cup rotation in degrees
const isCupFlipping = ref(false); // Tracks whether the cup is flipping (for animation)

// Add and remove players
const addPlayer = () => {
  players.value.push({ name: '', time: 0, flipped: false });
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
  nextPlayer();
};

// Reset the game
const resetGame = () => {
  timer.value = 0;
  currentRotation.value = 0;
  currentPlayerIndex.value = 0;
  isCupFlipped.value = false;
  gameWinner.value = '';
  gameLoser.value = '';
  players.value.forEach(player => {
    player.time = 0;
    player.flipped = false;
  });
};

// Move to the next player
const nextPlayer = () => {
  const currentPlayerData = players.value[currentPlayerIndex.value];
  if (currentPlayerData) {
    currentPlayer.value = currentPlayerData.name;
    currentRotation.value = 0;
    startTimer();
  }
};

// Start timer for the player
const startTimer = () => {
  timer.value = 0;
  clearInterval(timerInterval.value);
  timerInterval.value = setInterval(() => {
    timer.value += 0.1; // Increase time by 0.1 seconds
  }, 100);
};

// Handle button press
const tryToFlipCup = () => {
  if (!isCupFlipping.value) {
    // Check if there's a 1/50 chance to flip
    const flipChance = Math.random() < 1 / 50;

    if (flipChance) {
      // If successful, rotate the cup to 180 degrees
      flipCup();
    } else {
      // If not successful, do a small animation but no full flip
      shakeCup();
    }
  }
};

// Rotate the cup to 180 degrees and mark it as flipped
const flipCup = () => {
  isCupFlipping.value = true;
  currentRotation.value = 180;

  setTimeout(() => {
    isCupFlipping.value = false;
    completeFlip();
  }, 500); // Simulate 500ms animation duration
};

// Small shake animation for unsuccessful flip attempts
const shakeCup = () => {
  isCupFlipping.value = true;
  currentRotation.value += 10; // Just to give a small indication of movement

  setTimeout(() => {
    isCupFlipping.value = false;
    currentRotation.value -= 10; // Reset to initial rotation
  }, 200); // Quick shake
};

// Complete the flip and move to the next player or end game
const completeFlip = () => {
  clearInterval(timerInterval.value);
  players.value[currentPlayerIndex.value].time = timer.value;
  players.value[currentPlayerIndex.value].flipped = true;

  // Move to the next player or end the game
  if (currentPlayerIndex.value < players.value.length - 1) {
    currentPlayerIndex.value++;
    currentRotation.value = 0;
    nextPlayer();
  } else {
    endGame();
  }
};

// End the game and determine the winner/loser
const endGame = () => {
  clearInterval(timerInterval.value);

  // Find the player with the fastest and slowest flip times
  const fastestPlayer = players.value.reduce((prev, curr) => prev.time < curr.time ? prev : curr);
  const slowestPlayer = players.value.reduce((prev, curr) => prev.time > curr.time ? prev : curr);

  gameWinner.value = fastestPlayer.name;
  gameLoser.value = slowestPlayer.name;
  isGameStarted.value = false;
};

</script>

<template>
  <div class="h-full bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-10">Flip Cup Countdown</h1>

    <!-- Player Input -->
    <div v-if="!isGameStarted && !gameWinner" class="w-full max-w-lg mb-8">
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
      <h2 class="text-2xl font-bold mb-4">Current Player: {{ currentPlayer }}</h2>

      <!-- Timer and Cup Flip -->
      <p class="text-xl mb-6">Time: {{ timer.toFixed(1) }}s</p>

      <!-- Cup Image -->
      <div
          :style="{ transform: `rotate(${currentRotation}deg)`, transition: 'transform 0.5s ease' }"
          class="w-32 h-32 rounded-full cursor-pointer mx-auto flex items-center justify-center"
      >
        <img src="public/cup.png" alt="Cup" class="w-full h-full object-cover" />
      </div>

      <!-- Flip Button -->
      <button
          @click="tryToFlipCup"
          class="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Flip Cup
      </button>

      <!-- Show Player Times -->
      <div class="mt-8">
        <h3 class="text-lg font-bold mb-4">Player Times</h3>
        <ul class="text-left">
          <li v-for="player in players" :key="player.name">
            {{ player.name }}: {{ player.time.toFixed(1) }}s {{ player.flipped ? '(Flipped)' : '' }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Game Results -->
    <div v-if="gameWinner" class="text-center mt-8">
      <h2 class="text-4xl font-bold text-green-500 mb-4">{{ gameWinner }} was the fastest! 🎉</h2>
      <h2 class="text-4xl font-bold text-red-500 mb-4">{{ gameLoser }} was the slowest! 🍺</h2>
      <button @click="resetGame" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
        Play Again
      </button>
    </div>
  </div>
</template>

<style scoped>
/* You can add additional styling here if needed */
</style>
