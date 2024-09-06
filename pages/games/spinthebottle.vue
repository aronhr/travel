<script setup lang="ts">
import { ref } from 'vue';

// Players
const players = ref([{ name: '' }]);
const currentPlayer = ref('');
const currentChallenge = ref('');
const isSpinning = ref(false);
const bottleAngle = ref(0);

// Challenges
const challenges = ref([
  'Take 2 sips',
  'Tell a truth',
  'Do a dare',
  'Make a rule',
  'Drink twice',
  'Dance for 30 seconds',
  'Tell a joke',
  'Give someone a compliment',
  'Swap drinks with someone',
  'Sing a song',
  'Do 10 jumping jacks',
  'Do an impression of someone in the room',
  'Tell a funny story',
  'Share your most embarrassing moment',
  'Pretend to be a robot for 1 minute',
  'Act like a celebrity for 1 minute',
  'Do 5 push-ups',
  'Tell a secret',
  'Make a toast to the group',
  'Say the alphabet backward',
  'Act like a baby for 30 seconds',
  'Talk in a foreign accent for the next 2 rounds',
  'Name 5 movies as fast as you can',
  'Name 5 songs from the 90s',
  'Give a high five to everyone in the room',
  'Say a tongue twister 3 times fast',
  'Speak in only questions for the next 2 minutes',
  'Make an animal noise every time you speak for the next 5 minutes',
  'Tell the group your guilty pleasure',
  'Invent a dance move and show it',
  'Whisper everything you say for the next 2 rounds',
  'Act like you’re in slow motion for 30 seconds',
  'Pretend to be a waiter and take drink orders from the group',
  'Do your best impression of a rockstar',
  'Make a funny face and hold it for 10 seconds',
  'Pretend to juggle for 30 seconds',
  'Recite a poem (can be made up)',
  'Pretend you are a news anchor delivering breaking news',
  'Do 10 squats',
  'Run in place for 1 minute',
  'Pretend you’re swimming for 30 seconds',
  'Talk like a pirate for the next 2 rounds',
  'Do a cartwheel (or attempt one)',
  'Call someone and tell them a joke',
  'Act like a superhero for 30 seconds',
  'Try to balance a drink on your head for 10 seconds',
  'Do a plank for 30 seconds',
  'Imitate your favorite cartoon character',
  'Pretend you’re stuck in a box for 30 seconds',
  'Mime an activity for the group to guess',
  'Pretend to be a famous person for 1 minute',
  'Sing the chorus of your favorite song',
  'Recite a line from a movie and have the group guess the movie',
  'Say a random fact about yourself',
  'Try to lick your elbow',
  'Describe your dream vacation',
  'Give a funny nickname to someone in the room',
  'Walk on your knees for the next 1 minute',
  'Spin around 10 times and walk in a straight line',
  'Hold your breath for 20 seconds',
  'Do 10 lunges',
  'Say something in another language (if you know one)',
  'Talk like a baby for the next 2 rounds',
  'Act like you’re riding a horse for 30 seconds',
  'Tell the group what you had for breakfast',
  'Act out a scene from your favorite movie',
  'Make a funny noise and keep doing it for 10 seconds',
  'Invent a new handshake with someone in the room',
  'Do 3 cartwheels or attempts (if you can\'t)',
  'Pretend to be a cat for 30 seconds',
  'Pretend to climb an invisible ladder for 30 seconds',
  'Say the alphabet without moving your lips',
  'Impersonate a famous celebrity',
  'Try to stand on one foot for 1 minute',
  'Speak in rhyme for the next 2 rounds',
  'Pretend you’re a flight attendant explaining safety procedures',
  'Name 5 animals as fast as you can',
  'Give a toast to someone in the room',
  'Pretend to be a superhero for 1 minute',
  'Dance like nobody’s watching for 1 minute',
  'Hold a funny pose for 30 seconds',
  'Tell the group your best pickup line',
  'Say something nice about every person in the room',
  'Make a funny face and hold it for 15 seconds',
  'Invent a new word and give it a meaning',
  'Do 10 squats while holding your drink',
  'Pretend to be a fitness instructor and lead a 1-minute workout',
  'Speak only in whispers for the next 2 rounds',
  'Run to the nearest door and back',
  'Say something you’ve never told anyone before',
  'Do your best animal impression',
  'Do a dramatic reading of a song’s lyrics',
  'Name 5 countries that start with the letter "A"',
  'Sing the national anthem',
  'Balance on one foot for 30 seconds',
  'Do an air guitar solo for 30 seconds',
  'Say 5 random facts about yourself',
  'Pretend you are invisible for 1 minute',
  'Pretend to be a DJ and play an imaginary set',
  'Pretend you are a news reporter and report on something silly',
  'Imitate someone in the room',
  'Try to do a headstand (if safe)',
  'Make up a story about why you are late to an imaginary job',
  'Speak only in questions for the next 1 minute',
  'Recite a famous quote',
  'Walk like a crab for 30 seconds',
  'Pretend you’re swimming for 1 minute',
  'Pretend to ride a horse for 30 seconds',
  'Do 10 sit-ups',
  'Name 5 things that start with the letter "B"',
  'Recite the first 10 digits of Pi',
  'Invent a superhero name for yourself',
  'Tell everyone a random fun fact'
]);


// Adding and removing players
const addPlayer = () => {
  players.value.push({ name: '' });
};

const removePlayer = (index) => {
  players.value.splice(index, 1);
};

// Spin the bottle
const spinBottle = () => {
  if (players.value.length < 2 || players.value.some(player => !player.name.trim())) {
    alert('Please enter at least 2 valid player names!');
    return;
  }

  isSpinning.value = true;

  // Randomly select a player and a challenge after the spin
  const randomPlayerIndex = Math.floor(Math.random() * players.value.length);
  const randomChallengeIndex = Math.floor(Math.random() * challenges.value.length);

  // Simulate a bottle spin animation (random angle between 720 and 1080 degrees)
  const spinTime = 3000; // 3 seconds for spin
  const randomAngle = Math.floor(Math.random() * 360 + 720); // Between 720 and 1080 degrees

  // Animate the bottle spin
  bottleAngle.value += randomAngle;

  // Set current player and challenge when the bottle stops spinning
  setTimeout(() => {
    currentPlayer.value = players.value[randomPlayerIndex].name;
    currentChallenge.value = challenges.value[randomChallengeIndex];
    isSpinning.value = false;
  }, spinTime);
};
</script>

<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-10">Spin the Bottle</h1>

    <!-- Player Input -->
    <div v-if="!isSpinning && !currentPlayer" class="w-full max-w-lg mb-8">
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

    <!-- Bottle Spin -->
    <div class="w-full max-w-lg text-center">
      <div class="relative">
        <!-- Bottle Image -->
        <div class="w-32 h-32 mx-auto">
          <img
              :style="{ transform: 'rotate(' + bottleAngle + 'deg)' }"
              class="transition-transform duration-[3s] ease-out"
              src="public/bottle.png"
              alt="Bottle"
          />
        </div>

        <!-- Spin Button -->
        <button
            @click="spinBottle"
            :disabled="isSpinning"
            class="mt-20 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          {{ isSpinning ? 'Spinning...' : 'Spin the Bottle' }}
        </button>
      </div>

      <!-- Challenge -->
      <div v-if="currentPlayer && !isSpinning" class="mt-6 bg-white text-black p-4 rounded-lg">
        <h2 class="text-2xl font-bold">Player: {{ currentPlayer }}</h2>
        <p class="text-xl mt-2">Challenge: {{ currentChallenge }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No additional styles needed since Tailwind handles the layout and styles */
</style>
