<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/foo">Foo</router-link>
    <router-link to="/bar">Bar</router-link>
  </nav>
</template>

<script setup>
const { destinations } = defineProps(['destinations'])
</script>

<style scoped></style>
