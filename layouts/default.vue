<script setup>
import 'primeicons/primeicons.css';
import navigationBar from '~/components/navigationBar.vue';
import AppHeader from '/components/AppHeader';

import useNavbarVisibility from '~/composables/useNavbarVisibility.js';

const {isNavbarHidden} = useNavbarVisibility();

</script>

<template>
    <NuxtPwaManifest />
    <div class="flex flex-col justify-start h-screen">
        <AppHeader v-if="!isNavbarHidden"/>
        <div class="mb-20" id="dummy"></div>
        <slot />
        <navigationBar v-if="!isNavbarHidden" />
    </div>
</template>
