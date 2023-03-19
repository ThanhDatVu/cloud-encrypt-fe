<template>
  <section v-if="destination" class="destination">
    <h1>{{ destination.name }}</h1>
    <div class="destination-details">
      <img :src="`/images/${destination.image}`" :alt="destination.name" />
      <p>{{ destination.description }}</p>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const { destinations } = defineProps(['destinations'])

const destination = destinations.find(
  (destination) => destination.slug === route.params.slug
)
</script>

<style lang="scss" scoped></style>
