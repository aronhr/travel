<script setup>
useHead({
  title: 'Staðsetingar'
})
// Get the data from the JSON file
import usePlaces from "~/composables/usePlaces.js";
import useNavbarVisibility from "~/composables/useNavbarVisibility.js";

const menuSelection = ref('schedule');

const { getAllPlaces, getScheduledPlaces } = usePlaces()
const {isNavbarHidden} = useNavbarVisibility();

const handleOnClick = (value) => {
    menuSelection.value = value;
}

const computeButtonClass= (target) => {
    return target === menuSelection.value ? 'bg-gold font-bold' : 'bg-gray'
}

</script>

<template>
    <div class="md:h-screen w-auto bg-dark text-white" id="content">
      <Transition name="card" mode="out-in">
        <div v-if="menuSelection==='places'" class="flex flex-row flex-wrap justify-center gap-2">

            <div  v-for="place in getAllPlaces()" :key="place.id" class="w-96" >
                  <Card :place="place"/>
            </div>
        </div>
        <div v-else class="flex flex-row flex-wrap justify-center">
            <div  v-for="place in getScheduledPlaces()" :key="place.id"  class="w-96">
                  <Card :place="place"  />
            </div>
        </div>
      </Transition>
        <Transition appear name="nav">
          <div class="fixed bottom-24 w-full mx-auto" v-if="!isNavbarHidden">
            <div class="flex flex-row gap-0 w-52 h-8 justify-cente text-center mx-auto">
                <button class="w-full rounded-l-full transition border-r-2" @click="handleOnClick('schedule')" :class="computeButtonClass('schedule')">Schedule</button>
                <button class="w-full rounded-r-full transition" @click="handleOnClick('places')" :class="computeButtonClass('places')">Places</button>
            </div>
        </div>
        </Transition>
    </div>

</template>

<style scoped>
  .nav-enter-active {
    animation: navbarShow 0.3s;
  }
  .nav-leave-active {
    animation: navbarHide 0.1s
  }
  .card-enter-active {
    animation: cardsShow 0.3s;
  }
  .card-leave-active {
    animation: cardsHide 0.1s
  }

  @keyframes navbarShow {
    from {
      opacity: 0;
      translate: 0 50px;
      scale: 0.9;
    }
    to {
      translate: 0 0;
      opacity: 1;
      scale: 1;
    }
  }
  @keyframes navbarHide {
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

  @keyframes cardsShow {
      from {
        opacity: 0;
        transform: translateY(1vh); /* Moving the element 1vh down from its original position */
      }
      to {
        transform: translateY(0); /* Returning to the original position */
        opacity: 1;
      }
  }

  @keyframes cardsHide {
      from {
        opacity: 1;
        transform: translateY(0); /* Starting at the original position */
      }
      to {
        opacity: 0;
        transform: translateY(1vh); /* Moving the element 1vh down */
      }
  }
  
  @-webkit-keyframes cardsShow {
    from {
      opacity: 0;
      -webkit-transform: translateY(1vh);
    }
    to {
      -webkit-transform: translateY(0);
      opacity: 1;
    }
  }

  @-webkit-keyframes cardsHide {
    from {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
    to {
      opacity: 0;
      -webkit-transform: translateY(1vh);
    }
  }

</style>
