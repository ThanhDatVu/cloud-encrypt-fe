<template>
  <div class="foo">
    <div class="home">
      <h1>Foo</h1>

      <div v-if="destinations" class="destinations">
        <router-link v-for="destination in destinations" :to="{
          name: 'destination-page',
          params: { id: destination.id, slug: destination.slug },
        }" :key="destination.id">
          <h2>{{ destination.name }}</h2>
          <img :src="`/images/${destination.image}`" :alt="destination.name" />
        </router-link>
      </div>
    </div>
    <div v-if="encryptedFiles">
      <h1>Encrypted Files</h1>
      <div v-for="encryptedFile in encryptedFiles.data.results" :key="encryptedFile.id">
        <h2>{{ encryptedFile }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const { destinations } = defineProps(['destinations'])

const encryptedFiles = reactive({
  data: null,
  error: null,
  loading: false,
})


const fetchAllEncryptedFiles = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  await fetch("http://localhost:3000/v1/metadata", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      encryptedFiles.data = result

    })
    .catch(error => console.log('error', error));
  console.log("en", encryptedFiles.data)
  console.log("en", encryptedFiles.data.results)

}

fetchAllEncryptedFiles()

</script>

<style lang="scss" scoped></style>
