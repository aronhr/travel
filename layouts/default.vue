<script setup>
import 'primeicons/primeicons.css';
import navigationBar from '~/components/navigationBar.vue';
import AppHeader from '/components/AppHeader';
</script>

<template>
    <div class="flex flex-col justify-between h-screen">
        <AppHeader/>
        <NuxtPwaManifest />
        <slot />
        <navigationBar />
    </div>
</template>
