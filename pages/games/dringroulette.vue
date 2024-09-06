<script setup lang="ts">
import { ref } from 'vue';

useHead({
  title: 'Drink Roulette',
  meta: [
    {
      name: 'description',
      content: 'A fun drinking game where players spin a roulette to get a drinking challenge.'
    }
  ]
});

// Selected challenge after spinning
const currentChallenge = ref('');

// Spinning state and angle
const isSpinning = ref(false);
const rouletteAngle = ref(0);

// Challenges (you can add more or customize)
const challenges = ref([
  'Everyone drinks!',
  'Take two sips',
  'Pass your drink to the left',
  'Pass your drink to the right',
  'Swap drinks with someone',
  'Choose someone to drink',
  'Everyone takes a sip except you',
  'Take three sips',
  'Last person to raise their hand drinks',
  'The person to your left drinks',
  'The person to your right drinks',
  'Do a dance or take a sip',
  'Tell a joke or take a sip',
  'Make a toast or take two sips',
  'Invent a new rule for the game',
  'Take a shot',
  'Tell a truth or drink',
  'Do a dare or take two sips',
  'Choose someone to do a dare',
  'Take a selfie with the person to your left and drink together',
  'Everyone with brown hair drinks',
  'If you’re wearing blue, take a drink',
  'Swap seats with someone',
  'Give someone a compliment or take a drink',
  'Name 5 countries or take a drink',
  'Pretend to be a robot for the next round or take a sip',
  'The oldest person drinks',
  'The youngest person drinks',
  'Choose two people to swap drinks',
  'Do an impression of a celebrity or drink twice',
  'Make a funny face and hold it for 10 seconds or take a drink',
  'Sing a line from a song or take two sips',
  'Make a rule that everyone must follow for the next round',
  'Act like a chicken for 30 seconds or take a drink',
  'Pretend to juggle or drink twice',
  'Name 3 movies in 10 seconds or take a sip',
  'The tallest person in the room drinks',
  'The shortest person in the room drinks',
  'Do 5 jumping jacks or take a drink',
  'Call someone and tell them a joke or drink three times',
  'Whisper everything for the next two rounds or take two sips',
  'Hold your breath for 15 seconds or take a drink',
  'The person wearing the most colorful outfit drinks',
  'Whoever has the most apps on their phone takes a drink',
  'Show the group your lock screen or take two sips',
  'Do 10 squats or drink',
  'If you have more than 5 tabs open on your phone, take a drink',
  'Everyone with a pet at home takes a drink',
  'Swap drinks with the person to your right',
  'If you’ve ever traveled abroad, take a drink',
  'If you’ve ever been on a plane, take two sips',
  'The person with the most letters in their name takes a drink',
  'If you’ve ever been on a road trip, take a sip',
  'Tell the group something embarrassing or take a drink',
  'Dance for 30 seconds or drink three times',
  'Act like a superhero for 1 minute or drink twice',
  'Give the person next to you a compliment or drink',
  'Do 10 seconds of freestyle rap or take a drink',
  'Everyone wearing sneakers takes a drink',
  'Anyone with glasses takes two sips',
  'If you’ve ever gone camping, take a drink',
  'If you’ve ever been in a pool this year, take a drink',
  'Whoever’s birthday is closest must take a drink',
  'Make a funny noise every time you drink for the next 3 rounds',
  'Pick a person to do 5 push-ups or take a drink',
  'The last person to raise their hand takes two sips',
  'Name 3 songs or take a drink',
  'Do your best impression of an animal or take a drink',
  'Switch seats with the person across from you',
  'If you are the youngest sibling, take two sips',
  'If you are the oldest sibling, take a drink',
  'If you are an only child, take three sips',
  'Anyone who has dyed their hair takes a drink',
  'If you’ve ever broken a bone, take a drink',
  'Give a high five to someone or drink twice',
  'Share a random fact or take two sips',
  'If you have more than one sibling, take two sips',
  'Tell a joke or drink twice',
  'Sing the chorus of your favorite song or drink three times',
  'Everyone with long hair drinks',
  'Everyone with short hair drinks',
  'Make up a new dance move and show it or drink twice',
  'Everyone has to switch seats',
  'If you’ve ever played a musical instrument, take a drink',
  'Do an air guitar solo or drink twice',
  'Take a drink if you have your phone with you',
  'Everyone with their phone out takes a drink',
  'If you’re wearing jewelry, take a sip',
  'If you’ve ever been to a concert, take a drink',
  'Choose someone to finish their drink',
  'Pretend you’re a pirate for the next round or take a sip',
  'Swap seats with someone of your choice',
  'Give someone your best advice or take a drink',
  'Make an animal sound every time you speak for the next 2 rounds',
  'Give someone a nickname or take a drink',
  'If you’ve ever been in a wedding, take two sips',
  'The person with the longest name drinks',
  'The person with the shortest name drinks',
  'Make a toast to the group or take three sips',
  'Choose someone to drink and take a sip with them',
  'If you’ve ever been on a boat, take a drink',
  'If you’ve ever stayed up all night, take two sips',
  'Do a funny dance or take two drinks',
  'Anyone who has been on TV takes a drink',
  'If you’ve ever gone skiing, take a drink',
  'If you have a tattoo, take a drink',
  'If you don’t have a tattoo, take two sips',
  'Everyone takes two sips',
  'Everyone must compliment the person to their left',
  'Tell a random fact about yourself or take a drink',
  'Act like a celebrity for 30 seconds or take two sips',
  'The first person to raise their hand gets to pick someone to drink',
  'Spin around in a circle for 10 seconds or drink three times',
  'Everyone with siblings takes a drink',
  'Tell a secret or take two sips',
  'Imitate someone in the room or take a drink',
  'Say something nice about the person on your right or drink twice'
]);

// Spin the roulette
const spinRoulette = () => {

  isSpinning.value = true;

  // Simulate a roulette spin (random angle between 720 and 1080 degrees)
  const spinTime = 3000; // 3 seconds for spin
  const randomAngle = Math.floor(Math.random() * 360 + 720); // Between 720 and 1080 degrees
  const randomChallengeIndex = Math.floor(Math.random() * challenges.value.length);

  // Animate the roulette spin
  rouletteAngle.value += randomAngle;

  // Set current challenge when the roulette stops spinning
  setTimeout(() => {
    currentChallenge.value = challenges.value[randomChallengeIndex];
    isSpinning.value = false;
  }, spinTime);
};
</script>

<template>
  <div class="h-full bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-10">Drink Roulette</h1>

    <!-- Roulette Spin -->
    <div class="w-full max-w-lg text-center">
      <div class="relative">
        <!-- Roulette Image (replace with a roulette image) -->
        <div class="w-32 h-32 mx-auto">
          <img
              :style="{ transform: 'rotate(' + rouletteAngle + 'deg)' }"
              class="transition-transform duration-[3s] ease-out "
              src="public/roulette.png"
              alt="Roulette"
          />
        </div>

        <!-- Spin Button -->
        <button
            @click="spinRoulette"
            :disabled="isSpinning"
            class="mt-20 bg-lime-600 font-bold text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          {{ isSpinning ? 'Spinning...' : 'Spin the Roulette' }}
        </button>
      </div>

      <!-- Challenge -->
      <div v-if="currentChallenge && !isSpinning" class="mt-6 bg-white text-black p-4 rounded-lg transition-opacity ">
        <h2 class="text-2xl font-bold">Challenge: {{ currentChallenge }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No extra styling needed since Tailwind handles the layout and styles */
</style>
