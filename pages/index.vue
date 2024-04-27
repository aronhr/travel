<script setup>
// List of random names
const names = ['John', 'Doe', 'Jane', 'Doe', 'Foo', 'Bar', 'Baz', 'Qux', 'Quux', 'Corge', 'Grault', 'Garply', 'Waldo', 'Fred', 'Plugh', 'Xyzzy', 'Thud'];

// Randomly select a name
const name = names[Math.floor(Math.random() * names.length)];

</script>

<template>
  <div class="h-full flex flex-col p-8">
    <h1 class="text-4xl font-bold w-32">Velkomnir til Edinborgar</h1>
  </div>
</template>

<style scoped>

</style>