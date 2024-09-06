<script setup lang="ts">
import { ref } from 'vue';

useHead({
  title: 'Blackout Roulette',
  meta: [
    {
      name: 'description',
      content: 'A drinking game where you spin the wheel and do the corresponding action.'
    }
  ]
});

// Game state
const wheelResult = ref(1); // Default starting result
const wheelAction = ref('Tap to spin the wheel');
const isSpinning = ref(false); // Prevent rapid multiple spins
const escalationLevel = ref(1); // Keeps track of how intense the game gets
const turnCounter = ref(0); // Tracks the total number of spins

// Define drinking actions based on wheel result
const actions = {
  1: 'Take 2 sips.',
  2: 'Everyone takes 1 sip.',
  3: 'Pick someone to take 3 sips.',
  4: 'Swap drinks with someone and drink twice from their drink.',
  5: 'You drink twice.',
  6: 'Everyone drinks 3 sips.',
  7: 'Finish half your drink.',
  8: 'Pick a player. Both of you finish your drinks.',
  9: 'Drink double for the next 3 turns.',
  10: 'The next player drinks 5 sips, or they must finish their drink.',
  11: 'Everyone finishes their drink.',
  12: 'Last person to raise their hand takes 5 sips.',
  13: 'Make a rule. The next 3 rounds follow that rule.',
  14: 'Blackout Challenge: Spin again, do it twice.',
  15: 'Pour a shot. Whoever loses the next round drinks it.',
  16: 'Last person to touch the floor takes 3 sips.',
  17: 'Every player finishes their drink.',
  18: 'Blackout Time: Spin again, and everyone must do the action.',
  19: 'Finish your drink, or pick 2 players to finish theirs.',
  20: 'Blackout: Everyone must finish their drink.'
};

// Spin the wheel and trigger the corresponding action
const spinWheel = () => {
  if (isSpinning.value) return; // Prevent multiple spins
  isSpinning.value = true;

  // Simulate wheel spinning effect
  let spinCount = 0;
  const spinInterval = setInterval(() => {
    wheelResult.value = Math.floor(Math.random() * 20) + 1; // Random number between 1-20
    spinCount++;

    // After a few "spins", stop and set the final result
    if (spinCount > 10) {
      clearInterval(spinInterval);
      isSpinning.value = false;
      turnCounter.value++; // Increase the turn counter
      applyEscalation(); // Apply escalation multiplier if necessary
      wheelAction.value = actions[wheelResult.value]; // Set the corresponding action
    }
  }, 100); // Spin speed
};

// Apply escalation multiplier (every 10 turns)
const applyEscalation = () => {
  if (turnCounter.value % 10 === 0) {
    escalationLevel.value++;
    wheelAction.value += ` (x${escalationLevel.value} multiplier!)`; // Add multiplier
  }
};
</script>

<template>
  <div class="h-full bg-black flex flex-col items-center justify-center text-white">
    <h1 class="text-5xl font-bold mb-10">Blackout Roulette</h1>

    <!-- Wheel result display -->
    <div class="w-40 h-40 bg-red-600 rounded-full flex items-center justify-center text-6xl font-bold">
      {{ wheelResult }}
    </div>

    <!-- Action Text -->
    <p class="text-2xl mt-6">{{ wheelAction }}</p>

    <!-- Spin Button -->
    <button
        @click="spinWheel"
        class="bg-purple-600 text-white px-6 py-3 mt-6 rounded-lg hover:bg-purple-800 transition"
        :disabled="isSpinning"
    >
      Spin the Wheel
    </button>

    <!-- Escalation Level -->
    <p class="mt-8 text-lg">Escalation Level: {{ escalationLevel }}</p>
  </div>
</template>

<style scoped>
/* Add additional styles if needed */
</style>
