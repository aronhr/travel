<script setup lang="ts">
import { ref } from 'vue';

// Players
const players = ref([{ name: '' }]);
const currentPlayer = ref('');
const currentRule = ref('');
const drawnCard = ref(null);

// Deck of cards and their rules
const deck = ref([
  { value: '2', rule: 'You - Pick someone to drink' },
  { value: '3', rule: 'Me - You drink' },
  { value: '4', rule: 'Floor - Last to touch the floor drinks' },
  { value: '5', rule: 'Guys - All guys drink' },
  { value: '6', rule: 'Chicks - All girls drink' },
  { value: '7', rule: 'Heaven - Last to raise their hand drinks' },
  { value: '8', rule: 'Mate - Pick someone to drink with you' },
  { value: '9', rule: 'Rhyme - Pick a word, and go around rhyming. Loser drinks' },
  { value: '10', rule: 'Categories - Pick a category, go around naming items. Loser drinks' },
  { value: 'Jack', rule: 'Make a Rule - Create a new rule that everyone must follow' },
  { value: 'Queen', rule: 'Question Master - You become the question master' },
  { value: 'King', rule: 'King’s Cup - Pour some drink into the King’s Cup' },
  { value: 'Ace', rule: 'Waterfall - Everyone starts drinking, can’t stop until the person before them stops' }
]);

// Shuffle the deck
const shuffledDeck = ref([]);
const shuffleDeck = () => {
  shuffledDeck.value = [...deck.value].sort(() => Math.random() - 0.5);
};

// Drawing a card
const drawCard = () => {
  if (shuffledDeck.value.length === 0) {
    shuffleDeck();
  }
  drawnCard.value = shuffledDeck.value.pop();
  currentRule.value = drawnCard.value.rule;

  // Switch to the next player
  const playerIndex = players.value.findIndex(player => player.name === currentPlayer.value);
  currentPlayer.value = players.value[(playerIndex + 1) % players.value.length].name;
};

// Player setup
const addPlayer = () => {
  players.value.push({ name: '' });
};

const removePlayer = (index) => {
  players.value.splice(index, 1);
};

// Game Start
const startGame = () => {
  if (players.value.length < 2 || players.value.some(player => !player.name.trim())) {
    alert("Please enter valid player names!");
    return;
  }
  currentPlayer.value = players.value[0].name;
  shuffleDeck();
};
</script>

<template>
  <div class="h-full bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-10">Kings Cup</h1>

    <!-- Player Input -->
    <div v-if="!currentPlayer" class="w-full max-w-lg mb-8">
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
    </div>

    <!-- Game Start -->
    <div v-if="!currentPlayer" class="text-center mb-10">
      <button @click="startGame" class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
        Start Game
      </button>
    </div>

    <!-- Game Interface -->
    <div v-if="currentPlayer" class="w-full max-w-lg text-center">
      <h2 class="text-2xl font-bold mb-4">Current Player: {{ currentPlayer }}</h2>
      <div v-if="drawnCard" class="bg-white text-black p-4 rounded-lg mb-4">
        <p class="text-3xl mb-2">Card: {{ drawnCard.value?.value }}</p>
        <p class="text-xl">{{ currentRule }}</p>
      </div>
      <button @click="drawCard" class="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition">
        Draw a Card
      </button>
    </div>
  </div>
</template>

<style scoped>
/* No extra styling needed, handled by Tailwind */
</style>
