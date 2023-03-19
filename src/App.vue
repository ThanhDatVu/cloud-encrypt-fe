<template>
  <TheNavigation :destinations="destinations.data" />

  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component
          :is="Component"
          :key="$route.path"
          :destinations="destinations.data"
        ></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import TheNavigation from '@/components/TheNavigation.vue'

import { onMounted, reactive } from 'vue'

const destinations = reactive({
  data: null,
  error: null,
  loading: false,
})

const fetchDestinations = async () => {
  destinations.loading = true

  try {
    const response = await fetch('http://localhost:9000/destinations')
    const data = await response.json()
    destinations.data = data
  } catch (error) {
    destinations.error = error
  } finally {
    destinations.loading = false
  }
}

onMounted(() => {
  fetchDestinations()
})
</script>

<style scoped></style>
