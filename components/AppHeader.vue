<script setup>
    const route = useRoute()
</script>

<template>
    <Transition appear>
        <div class="fixed flex flex-row justify-center bg-dark z-10 h-20 w-full">
            <div class="w-1/3 flex flex-row justify-start items-center">
                <button class="relative right-3" v-if="route.name === 'schedule-id'" @click="$router.go(-1)"><i class="pi pi-angle-left text-xl text-white"></i></button>
            </div>
            <router-link to="/"><img src="/public/icons/apple-icon-180.png" alt="logo" class="object-cover h-20 w-auto"></router-link>
            
            <div class="w-1/3"></div>
        </div>

    </Transition>
    
</template>

<style scoped>
.v-enter-active {
    animation: swirlAdded 0.2s;
  }
  .v-leave-active {
    animation: swirlRemove 0.3s
  }
  @keyframes swirlAdded {
    from {
      opacity: 1;
      translate: 0 -50px;
      scale: 1;
    }
    to {
      translate: 0 0;
      opacity: 1;
      scale: 1;
    }
  }
  @keyframes swirlRemove {
    from {
      opacity: 1;
      translate: 0 0;
      scale: 1
    }
    to {
      opacity: 0;
      translate: 0 -50px;
      scale: 1
    }
  }
</style>