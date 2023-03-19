<template>
  <div class="home">
    <h1>Bar
    </h1>

    <div v-if="destinations" class="destinations">
      <router-link
        v-for="destination in destinations"
        :to="{
          name: 'destination-page',
          params: { id: destination.id, slug: destination.slug },
        }"
        :key="destination.id"
      >
        <h2>{{ destination.name }}</h2>
        <img :src="`/images/${destination.image}`" :alt="destination.name" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
const { destinations } = defineProps(['destinations'])
</script>

<style lang="scss" scoped></style>
