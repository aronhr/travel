<script setup>
import 'primeicons/primeicons.css';
import navigationBar from '~/components/navigationBar.vue';
</script>

<template>
    <div class="flex flex-col justify-between h-screen">
        <slot />
        <navigationBar />
    </div>
</template>