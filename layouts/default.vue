<script setup>
import 'primeicons/primeicons.css';
import navigationBar from '~/components/navigationBar.vue';
import AppHeader from '/components/AppHeader';
</script>

<template>
    <NuxtPwaManifest />
    <div class="flex flex-col justify-between h-screen">
        <AppHeader/>
        <slot />
        <navigationBar />
    </div>
</template>
