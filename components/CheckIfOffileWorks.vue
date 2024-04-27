<script setup>
import { useToast } from 'primevue/usetoast';
const { $pwa } = useNuxtApp()

const toast = useToast();

console.log($pwa)
console.log($pwa.offlineReady)
console.log($pwa.isPWAInstalled)

if (!$pwa.isPWAInstalled) {
  $pwa.showInstallPrompt = () => {
    $pwa.installPWA()
  }
}

onMounted(() => {
  if ($pwa.offlineReady.value) {
    toast.add({ severity: 'success', summary: 'App ready to work offline', life: 5000 });
  } else {
    toast.add({ severity: 'error', summary: 'App not ready to work offline', life: 5000 });
  }

})
</script>

<template>
  <!-- You can use $pwa directly in templates! -->
  <div v-show="$pwa.needRefresh">
    <span>
      New content available, click on reload button to update.
    </span>

    <button @click="$pwa.updateServiceWorker()">
      Reload
    </button>
  </div>
</template>
