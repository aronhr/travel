<script setup>
useHead({
  title: 'Kaffihús með AI'
})

const recommendations = ref([])
const loading = ref(false)
const error = ref(null)

const fetchRecommendations = async () => {
  loading.value = true
  error.value = null
  try {
    const data = await $fetch('/api/coffee-recommendations')
    recommendations.value = data.recommendations
  } catch (e) {
    error.value = 'Ekki tókst að sækja tillögur. Vinsamlegast reyndu aftur.'
  } finally {
    loading.value = false
  }
}

const priceColorMap = { '€': 'text-green-400', '€€': 'text-yellow-400', '€€€': 'text-orange-400' }
const priceColor = (price) => priceColorMap[price] ?? 'text-orange-400'

const starArray = (rating) => {
  return Array.from({ length: 5 }, (_, i) => i + 1 <= Math.round(rating))
}
</script>

<template>
  <div class="pb-24 min-h-screen bg-dark text-white">
    <div class="max-w-2xl mx-auto p-4">
      <div class="flex flex-col items-center text-center py-8 gap-3">
        <div class="flex items-center gap-3">
          <i class="pi pi-sparkles text-gold text-3xl" />
          <h1 class="text-3xl font-extrabold text-gold">AI Kaffihústillögur</h1>
        </div>
        <p class="text-gray-300 text-sm max-w-sm">
          Fáðu AI-knúnar tillögur að bestu kaffihúsunum í Búdapest, valdar sérstaklega fyrir þig.
        </p>
        <button
          @click="fetchRecommendations"
          :disabled="loading"
          class="mt-2 flex items-center gap-2 bg-gold text-dark font-bold px-6 py-3 rounded-full shadow-lg transition hover:brightness-110 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <i v-if="loading" class="pi pi-spin pi-spinner" />
          <i v-else class="pi pi-sparkles" />
          {{ loading ? 'Hleð tillögum...' : 'Fá AI Tillögur' }}
        </button>
      </div>

      <div v-if="error" class="bg-red-900 border border-red-600 text-red-200 rounded-xl p-4 text-center mb-4">
        <i class="pi pi-exclamation-triangle mr-2" />
        {{ error }}
      </div>

      <Transition name="fade">
        <div v-if="recommendations.length > 0" class="flex flex-col gap-4">
          <div
            v-for="(cafe, index) in recommendations"
            :key="index"
            class="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg"
          >
            <div class="p-4 flex flex-col gap-2">
              <div class="flex justify-between items-start gap-2">
                <h2 class="text-xl font-bold leading-tight">{{ cafe.name }}</h2>
                <span :class="['font-bold text-lg shrink-0', priceColor(cafe.priceRange)]">{{ cafe.priceRange }}</span>
              </div>

              <div class="flex items-center gap-1">
                <template v-for="(filled, i) in starArray(cafe.rating)" :key="i">
                  <i :class="['pi text-sm', filled ? 'pi-star-fill text-yellow-400' : 'pi-star text-gray-500']" />
                </template>
                <span class="text-gray-400 text-sm ml-1">{{ cafe.rating }}/5</span>
              </div>

              <p class="text-gray-300 text-sm leading-relaxed">{{ cafe.description }}</p>

              <div class="flex items-start gap-2 text-sm text-gray-400">
                <i class="pi pi-map-marker mt-0.5 shrink-0 text-gold" />
                <span>{{ cafe.address }}</span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <i class="pi pi-star text-gold" />
                <span class="text-gray-300 italic">{{ cafe.specialty }}</span>
              </div>

              <div class="flex flex-wrap gap-2 mt-1">
                <span
                  v-for="tag in cafe.tags"
                  :key="tag"
                  class="bg-dark border border-gray-600 text-gray-300 text-xs px-2 py-1 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div v-if="!loading && recommendations.length === 0 && !error" class="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
        <i class="pi pi-coffee text-6xl text-gray-700" />
        <p class="text-center text-sm">Smelltu á hnappinn hér að ofan til að fá AI-tillögur að kaffihúsum í Búdapest.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active {
  animation: fadeIn 0.4s ease;
}
.fade-leave-active {
  animation: fadeIn 0.2s ease reverse;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
