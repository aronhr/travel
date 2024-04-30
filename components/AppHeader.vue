<script setup>
    const route = useRoute()
</script>

<template>
    <div class="flex flex-row justify-center bg-dark z-10 h-20">
        <div class="w-1/3 flex flex-row justify-start items-center">
            <button class="relative right-3" v-if="route.name === 'schedule-id'" @click="$router.go(-1)"><i class="pi pi-angle-left text-xl text-white"></i></button>
        </div>
        <img src="/public/icons/apple-icon-180.png" alt="logo" class="object-cover h-20 w-auto">
        <div class="w-1/3"></div>
    </div>
</template>
