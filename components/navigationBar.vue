<script setup>
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";

import { useRoute } from 'vue-router'

let route = useRoute().name;
function computeLinkClass(targetRoute) {
    route = useRoute().name
    return route === targetRoute ? 'text-gold' : null
};

</script>
<template>
    <div class="fixed bottom-0 w-full z-10 ">
        <div class="flex flex-row justify-end w-full mt-auto bg-dark text-gray py-4 z-10 h-20 items-center overflow-hidden">
            <div class="flex flex-row justify-between w-full text-center">
                <NuxtLink to="/" class="w-1/3 border-r-2 border-white" :class="computeLinkClass('index')">
                    <i class="pi pi-home" style="font-size: 1.5rem" />
                </NuxtLink>
                <NuxtLink to="/schedule" class="w-1/3" :class="computeLinkClass('schedule')">
                    <i class="pi pi-list" style="font-size: 1.5rem" />
                </NuxtLink>
                <NuxtLink to="/place" class="w-1/3 border-l-2 border-white" :class="computeLinkClass('place')">
                    <i class="pi pi-compass" style="font-size: 1.5rem" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
        

<style scoped />
