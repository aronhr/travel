<script setup>
import useNavbarVisibility from '../composables/useNavbarVisibility.js';
const {isNavbarHidden} = useNavbarVisibility();

let route = useRoute().name;
const computeLinkClass = (targetRoute) => {
    route = useRoute().name // Assign a new route when nav loads again
    return route === targetRoute ? 'text-gold' : null
};

</script>
<template>
    <Transition appear>
        <div class="fixed bottom-0 w-full z-50 " v-if="!isNavbarHidden">
            <div class="flex flex-row w-full bg-dark text-gray py-4 z-10 h-20 items-center overflow-hidden">
                <div class="flex flex-row justify-between w-full text-center">
                    <router-link to="/" class="group w-1/3 border-r-2 border-white" :class="computeLinkClass('index')">
                        <i class="pi pi-home group-hover:scale-105 group-hover:text-white transition duration-75" style="font-size: 1.5rem" />
                    </router-link>
                    <router-link to="/schedule" class="group w-1/3" :class="computeLinkClass('schedule')">
                        <i class="pi pi-list group-hover:scale-105 group-hover:text-white transition duration-75" style="font-size: 1.5rem" />
                    </router-link>
                    <router-link to="/place" class=" group w-1/3 border-l-2 border-white" :class="computeLinkClass('place')">
                        <i class="pi pi-compass group-hover:scale-105 group-hover:text-white transition duration-75" style="font-size: 1.5rem" />
                    </router-link>
                  <router-link to="/games" class=" group w-1/3 border-l-2 border-white" :class="computeLinkClass('games')">
                    <i class="pi pi-ticket group-hover:scale-105 group-hover:text-white transition duration-75" style="font-size: 1.5rem" />
                  </router-link>
                </div>
            </div>
        </div>
    </Transition>
</template>


<style scoped>
.v-enter-active {
    animation: swirlAdded 0.3s;
  }
  .v-leave-active {
    animation: swirlRemove 0.3s
  }
  @keyframes swirlAdded {
    from {
      opacity: 1;
      translate: 0 50px;
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
      translate: 0 50px;
      scale: 0.9
    }
  }

</style>
