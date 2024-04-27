<script setup>
import Divider from "primevue/divider"
import { useRoute } from 'vue-router'

let route = useRoute().name;
function computeLinkClass(targetRoute) {
    route = useRoute().name
    return route === targetRoute ? 'text-blue-700' : null
};

</script>
<template>
    <div class="w-screen bg-slate-300 text-black h-14">
        <ul class="w-full flex flex-row justify-around text-center py-4">
            <NuxtLink to="/" class="w-1/3" :class="computeLinkClass('index')">
                <i class="pi pi-home" style="font-size: 1.5rem" />
            </NuxtLink>
            <Divider layout="vertical" class="bg-black w-[2px]" />
            <NuxtLink to="/schedule" class="w-1/3" :class="computeLinkClass('schedule')">
                <i class="pi pi-list" style="font-size: 1.5rem" />
            </NuxtLink>
            <Divider layout="vertical" class="bg-black w-[2px]" />
            <NuxtLink to="/place" class="w-1/3" :class="computeLinkClass('/')">
                <i class="pi pi-compass" style="font-size: 1.5rem" />
            </NuxtLink>
        </ul>
    </div>
</template>
        

<style scoped />
