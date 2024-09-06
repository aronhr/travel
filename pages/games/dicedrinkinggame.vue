<script setup lang="ts">
import { ref } from 'vue';

// Dice state
const diceNumber = ref(1); // Default starting value
const diceAction = ref('Tap to Roll the Die');
const isRolling = ref(false); // To prevent rapid multiple rolls

// Define drinking actions based on dice number
const actions = {
  1: 'You drink!',
  2: 'Everyone drinks!',
  3: 'Swap drinks with someone!',
  4: 'Choose someone to drink!',
  5: 'Take two sips!',
  6: 'Make a rule for the next round!',
  7: 'Last person to raise their hand drinks!',
  8: 'Give a toast, then drink!',
  9: 'You drink twice!',
  10: 'Pick a player to drink twice!',
  11: 'Everyone takes one sip!',
  12: 'Sing a song or drink!',
  13: 'Ask a trivia question. Whoever gets it wrong drinks!',
  14: 'Make a silly face, or take a sip!',
  15: 'Swap seats with someone and drink!',
  16: 'Everyone who has never been to Europe drinks!',
  17: 'Take a selfie with someone and drink!',
  18: 'Last person to finish their drink takes two sips!',
  19: 'Anyone wearing blue drinks!',
  20: 'Everyone with a pet drinks!',
  21: 'Choose a player to give a compliment, then both of you drink!',
  22: 'Make a toast for the group!',
  23: 'Everyone who likes pizza drinks!',
  24: 'Anyone with their phone on the table drinks!',
  25: 'Everyone with glasses drinks!',
  26: 'Pick a drinking buddy; every time you drink, they drink too!',
  27: 'The person to your left drinks!',
  28: 'The person to your right drinks!',
  29: 'Take a sip for every country you’ve visited!',
  30: 'Tell a joke. If nobody laughs, take a drink!',
  31: 'Everyone who’s wearing a watch drinks!',
  32: 'Swap drinks with the person across from you!',
  33: 'Everyone with a sibling drinks!',
  34: 'Do a dance or take a sip!',
  35: 'Everyone who’s been to a concert drinks!',
  36: 'Pick a player to drink for 5 seconds!',
  37: 'Everyone with a social media account drinks!',
  38: 'Take a drink if you’ve ever broken a bone!',
  39: 'Take a drink if you’ve ever traveled alone!',
  40: 'Anyone wearing red drinks!',
  41: 'The tallest person drinks!',
  42: 'The shortest person drinks!',
  43: 'Everyone take one sip!',
  44: 'You choose a player to drink!',
  45: 'You take two sips!',
  46: 'Everyone has to say a word in the same category (e.g., animals). The first to repeat or hesitate drinks!',
  47: 'Anyone who has played a sport drinks!',
  48: 'Anyone who has ever been skydiving drinks!',
  49: 'Take a drink if you’ve ever been to a theme park!',
  50: 'Do 10 jumping jacks, or take 3 sips!',
  51: 'Give someone a high five, then both of you drink!',
  52: 'Take a sip for every letter in your first name!',
  53: 'You and the person next to you both drink!',
  54: 'Everyone with a hat drinks!',
  55: 'Pick two players to swap drinks!',
  56: 'Tell a funny story, or take a sip!',
  57: 'Play rock-paper-scissors with the person next to you. Loser drinks!',
  58: 'Everyone who has a tattoo drinks!',
  59: 'You and the last player to roll both drink!',
  60: 'Roll again, and whatever you get, you drink that many sips!'
};

// Roll the dice and trigger the corresponding action
const rollDice = () => {
  if (isRolling.value) return; // Prevent multiple rolls
  isRolling.value = true;

  // Simulate dice rolling effect
  let rollCount = 0;
  const rollInterval = setInterval(() => {
    diceNumber.value = Math.floor(Math.random() * 6) + 1; // Random number between 1-6
    rollCount++;

    // After a few "rolls", stop and set the final dice number
    if (rollCount > 10) {
      clearInterval(rollInterval);
      isRolling.value = false;
      diceAction.value = actions[diceNumber.value]; // Set the corresponding action
    }
  }, 100); // Roll speed
};

</script>

<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-10">Dice Drinking Game</h1>

    <!-- Dice Display -->
    <div class="w-32 h-32 bg-yellow-500 rounded-lg flex items-center justify-center text-6xl font-bold">
      {{ diceNumber }}
    </div>

    <!-- Action Text -->
    <p class="text-xl mt-6">{{ diceAction }}</p>

    <!-- Roll Button -->
    <button
        @click="rollDice"
        class="bg-blue-500 text-white px-6 py-2 mt-6 rounded-lg hover:bg-blue-600 transition"
        :disabled="isRolling"
    >
      Roll the Dice
    </button>
  </div>
</template>

<style scoped>
/* Add additional styles if needed */
</style>
