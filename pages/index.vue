<script setup>
// List of random names
const names = ['John', 'Doe', 'Jane', 'Doe', 'Foo', 'Bar', 'Baz', 'Qux', 'Quux', 'Corge', 'Grault', 'Garply', 'Waldo', 'Fred', 'Plugh', 'Xyzzy', 'Thud'];

// Randomly select a name
const name = names[Math.floor(Math.random() * names.length)];

</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello {{ name }}</h1>
  </div>
</template>

<style scoped>

</style>
