<script setup>
useHead({
  title: 'Power Hour Contest',
  meta: [
    {
      name: 'description',
      content: 'A fun drinking game where players take turns completing tasks every minute for an hour.'
    }
  ]
});
</script>
<template>
  <div class="h-full flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-primary mb-6">Power Hour Contest</h1>

    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <!-- Time Remaining -->
      <div class="text-center mb-4">
        <p class="text-2xl">Time Remaining</p>
        <p class="text-5xl font-bold text-accent">{{ formattedTime }}</p>
      </div>

      <!-- Player Input Fields -->
      <div v-if="!running" class="mb-6">
        <h2 class="text-2xl font-bold text-primary mb-4">Enter Players</h2>
        <div v-for="(player, index) in players" :key="index" class="mb-2 flex items-center">
          <input
              v-model="player.name"
              type="text"
              placeholder="Enter player name"
              class="bg-gray-200 px-3 py-2 rounded-md w-full"
          />
          <button @click="removePlayer(index)" class="bg-red-500 text-white px-2 py-1 rounded-md ml-2">X</button>
        </div>
        <button @click="addPlayer" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Add Player</button>
      </div>

      <!-- Game Start Button -->
      <div v-if="!running" class="text-center">
        <button
            @click="startPowerHour"
            class="p-button p-button-raised p-button-success">
          Start Power Hour
        </button>
      </div>

      <!-- Task for Players -->
      <div v-if="running" class="text-center">
        <p class="text-red-600 font-bold text-lg mb-4">{{ currentTask }}</p>
        <p class="text-primary font-bold text-lg mb-4">Player: {{ currentPlayer.name }}</p>
        <button
            @click="taskCompleted"
            class="p-button p-button-raised p-button-success">
          Task Completed
        </button>
        <button
            @click="taskFailed"
            class="p-button p-button-raised p-button-danger ml-4">
          Task Failed (5 sips)
        </button>
      </div>

      <!-- Reset Button -->
      <div v-if="running" class="text-center mt-6">
        <button
            @click="resetPowerHour"
            class="p-button p-button-raised p-button-danger">
          Reset
        </button>
      </div>

      <!-- Notification -->
      <p v-if="notification" class="text-yellow-500 text-center mt-4 font-bold">{{ notification }}</p>
    </div>

    <!-- Peep Sound -->
    <audio ref="peepSound" src="/beep.mp3"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalSeconds: 3600,
      interval: null,
      running: false,
      notification: '',
      players: [{ name: '' }],
      currentPlayer: { name: '' },
      tasks: [
        "Do 10 push-ups",
        "Tell a joke",
        "Dance for 30 seconds",
        "Sing a song",
        "Balance on one foot for 30 seconds",
        "Recite the alphabet backward",
        "Take a selfie with the person next to you",
        "Imitate an animal of someone’s choice",
        "Pretend to be a waiter and take drink orders",
        "Speak in an accent for the next 2 minutes",
        "High five everyone in the room",
        "Do 10 squats",
        "Act out a movie scene for others to guess",
        "Run to the nearest door and back",
        "Share an embarrassing story",
        "Compliment everyone in the room",
        "Do a plank for 30 seconds",
        "Name 5 countries that start with the letter 'S'",
        "Do 5 jumping jacks",
        "Mimic a famous celebrity",
        "Let someone draw a mustache on your face",
        "Do the moonwalk across the room",
        "Pretend you are a news anchor and deliver breaking news",
        "Give a toast to someone in the room",
        "Spin around 10 times and walk in a straight line",
        "Talk like a robot for the next 2 minutes",
        "Name 3 songs from the 90s",
        "Pretend to cry for 1 minute",
        "Say a tongue twister 5 times fast",
        "Hold your breath for 20 seconds",
        "Act like a superhero for 30 seconds",
        "Make up a new dance move and show it",
        "Pretend you are taking a shower",
        "Say something in another language",
        "Pretend to eat an imaginary sandwich",
        "Tell a ghost story",
        "Call someone and tell them a joke",
        "Imitate your favorite cartoon character",
        "Do an impression of a famous actor",
        "Make up a song about someone in the room",
        "Hold a funny pose for 30 seconds",
        "Say 'Peter Piper picked a peck of pickled peppers' 5 times fast",
        "Do your best karate moves",
        "Act like a baby for 30 seconds",
        "Create a new handshake with someone",
        "Pretend to juggle invisible objects",
        "Name 5 things that start with the letter 'B'",
        "Spin in a circle for 15 seconds",
        "Do an air guitar solo for 30 seconds",
        "Recite a poem",
        "Make up a superhero name for yourself",
        "Walk like a crab for 15 seconds",
        "Do your best dance move for 10 seconds",
        "Impersonate someone in the room",
        "Act like a robot for 1 minute",
        "Pretend to be in a musical and sing everything you say for 1 minute",
        "Run in place for 30 seconds",
        "Pretend to be a chicken for 30 seconds",
        "Whisper everything you say for the next 2 minutes",
        "Pretend you are a teacher and explain something random",
        "Make an animal sound every time you take a drink for the next 5 minutes",
        "Act like you're in slow motion for 30 seconds",
        "Speak in rhymes for the next 2 minutes",
        "Do a dramatic reading of a song's lyrics",
        "Invent a new word and its meaning",
        "Pretend to be a TV chef explaining a recipe",
        "Act out a scene from your favorite movie",
        "Do 5 burpees",
        "Try to lick your elbow",
        "Give someone a nickname",
        "Pretend to be an alien visiting Earth",
        "Act like a pirate for 1 minute",
        "Sing everything you say for the next 2 minutes",
        "Do the worm dance",
        "Say the alphabet without moving your lips",
        "Do a cartwheel (or attempt one)",
        "Say a random fact about yourself",
        "Make a funny face and hold it for 10 seconds",
        "Pretend you're a fashion model and walk the 'runway'",
        "Act like a stand-up comedian for 1 minute",
        "Mime picking an apple from a tree and eating it",
        "Pretend to conduct an orchestra for 30 seconds",
        "Do your best impression of a politician",
        "Pretend to be a sports commentator narrating an imaginary game",
        "Tell a knock-knock joke",
        "Describe your dream vacation",
        "Sing the chorus of your favorite song",
        "Pretend to be a famous person for 1 minute",
        "Play air drums for 20 seconds",
        "Do 10 lunges",
        "Pretend you're a fitness instructor and lead a mini-workout",
        "Whistle a song",
        "Spell your name backward",
        "Name 5 fruits in 10 seconds",
        "Pretend to climb an invisible ladder",
        "Walk on your knees for 30 seconds",
        "Speak only in questions for the next 1 minute",
        "Pretend you're on a cooking show and describe your favorite dish",
        "Act like you're in a silent film for 30 seconds",
        "Pretend you're an auctioneer and sell an imaginary item",
        "Tell a story about the last dream you remember",
        "Dance like no one's watching for 30 seconds",
        "Pretend you're a flight attendant explaining safety procedures",
        "Act like you're stuck in slow motion",
        "Speak in only whispers for 1 minute",
        "Recite the first 10 digits of Pi",
        "Pretend you're rowing a boat for 30 seconds",
        "Pretend to be a character from a TV show for 1 minute",
        "Spell 'supercalifragilisticexpialidocious'",
        "Act like you’re swimming in a pool for 30 seconds",
        "Pretend to be invisible for 1 minute",
        "Say 'Sally sells seashells by the seashore' 3 times fast",
        "Create a funny story about why you're late to work",
        "Pretend you're a rockstar performing on stage",
        "Do 5 push-ups",
        "Pretend to drive a car and give commentary on the imaginary road",
        "Do 10 seconds of freestyle rap",
        "Speak with a different accent for 1 minute",
        "Act like you’re teaching an art class",
        "Describe yourself using only movie titles",
        "Pretend you're making a TikTok video",
        "Recite your favorite quote",
        "Pretend to be a cat for 1 minute",
        "Create a new dance move and show it off",
        "Walk backward for 30 seconds",
        "Pretend to ride a horse for 30 seconds",
        "Make up a new nickname for yourself",
        "Pretend you're a newscaster reporting live from a storm",
        "Try to juggle with imaginary balls",
        "Pretend you’re taking a selfie with an invisible phone",
        "Create a haiku on the spot",
        "Do your best magic trick",
        "Make a paper airplane and fly it",
        "Talk in slow motion for 30 seconds",
        "Make up a handshake with someone in the room",
        "Pretend to fish and reel in a big catch",
        "Act like a statue for 30 seconds",
        "Pretend you're an auctioneer and auction off an imaginary item",
        "Pretend you are a lifeguard on duty",
        "Do a rap about the game you're playing",
        "Pretend you're a cowboy/girl for 30 seconds",
        "Make an animal sound every time you speak for the next 2 minutes"
      ],
      currentTask: '',
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.totalSeconds / 60);
      const seconds = this.totalSeconds % 60;
      return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    },
  },
  methods: {
    padZero(num) {
      return num < 10 ? `0${num}` : num;
    },
    addPlayer() {
      this.players.push({ name: '' });
    },
    removePlayer(index) {
      this.players.splice(index, 1);
    },
    startPowerHour() {
      if (this.players.length < 2 || this.players.some(player => !player.name.trim())) {
        this.notification = "Please enter at least 2 valid player names!";
        return;
      }
      this.running = true;
      this.interval = setInterval(() => {
        if (this.totalSeconds > 0) {
          this.totalSeconds--;
          if (this.totalSeconds % 60 === 0 && this.totalSeconds !== 0) {
            this.assignRandomTask();
            this.playPeepSound();
          }
        } else {
          this.endPowerHour();
        }
      }, 1000);
    },
    playPeepSound() {
      this.$refs.peepSound.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    },
    resetPowerHour() {
      clearInterval(this.interval);
      this.totalSeconds = 3600;
      this.running = false;
      this.notification = '';
    },
    assignRandomTask() {
      const randomPlayerIndex = Math.floor(Math.random() * this.players.length);
      this.currentPlayer = this.players[randomPlayerIndex];
      const randomTaskIndex = Math.floor(Math.random() * this.tasks.length);
      this.currentTask = this.tasks[randomTaskIndex];
    },
    taskCompleted() {
      this.notification = `${this.currentPlayer.name} completed the task!`;
      setTimeout(() => {
        this.notification = '';
      }, 3000);
    },
    taskFailed() {
      this.notification = `${this.currentPlayer.name} failed the task! Take 5 extra sips!`;
      setTimeout(() => {
        this.notification = '';
      }, 3000);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.bg-primary-dark {
  background-color: #2C3E50; /* Dark background */
}

.text-primary {
  color: #3498DB; /* Bright blue for text */
}

.text-accent {
  color: #E74C3C; /* Red accent color */
}

.p-button {
  padding: 8px 16px;
  font-size: 16px;
}
</style>
