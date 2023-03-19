<template>
  <div class="home">
    <h1>All Destinations</h1>

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

import { onMounted, reactive } from 'vue'

const destinations = reactive({
  data: null,
  error: null,
  loading: false,
})


var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3000/v1/metadata", requestOptions)
  .then(response => response.text())
  .then(result => {
      console.log(result)
  })
  .catch(error => console.log('error', error));

onMounted(() => {
})  
</script>

<style lang="scss" scoped></style>
