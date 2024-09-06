<script setup lang="ts">
type game = {
  name: string,
  link: string,
  color: string
}

const games: game[] = [
  { name: 'Power Hour', link: '/games/powerhour', color: 'bg-red-500' },
  { name: 'Kings Cup', link: '/games/kingscup', color: 'bg-blue-500' },
  { name: 'Spin the Bottle', link: '/games/spinthebottle', color: 'bg-teal-700' },
  { name: 'Quiz Game', link: '/games/quizgame', color: 'bg-yellow-500' },
  { name: 'Drink Roulette', link: '/games/dringroulette', color: 'bg-purple-500' },
  { name: 'Never Have I Ever', link: '/games/neverhaveiever', color: 'bg-pink-500' },
  { name: 'Flip Cup Countdown', link: '/games/flipcup', color: 'bg-indigo-500' },
  { name: 'Category Game', link: '/games/categorygame', color: 'bg-gray' },
  { name: 'Dice Drinking Game', link: '/games/dicedrinkinggame', color: 'bg-orange-500' },
  { name: 'Pass the Bomb', link: '/games/passthebomb', color: 'bg-teal-500' }
]
</script>

<template>
  <div class="h-full bg-gray-800 flex flex-col items-center justify-center text-white">
    <h1 class="text-4xl font-bold mb-20">Games</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 w-full max-w-2xl gap-4">
      <div v-for="(game, index) in games" :key="index" class="bg-gray-700 rounded-lg p-2 flex items-center justify-between h-20">
        <nuxt-link
          :to="game.link"
          :class="[game.color, 'flex items-center justify-center w-full h-full text-white px-4 py-2 rounded-lg hover:bg-opacity-75 transition font-bold row-span-2 shadow-lg']"
        >
          {{ game.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No additional styles needed since Tailwind handles the layout and styles */
</style>
