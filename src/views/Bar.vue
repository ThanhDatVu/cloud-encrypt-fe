<template>
  <div class="foo">
    <div class="home">
      <h1>bar</h1>

    </div>
    <div v-if="encryptedFiles">
      <h1>Encrypted Files</h1>
      <div v-for="encryptedFile in encryptedFiles.data?.results" :key="encryptedFile.id">
        <h2>{{ encryptedFile }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

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
  console.log("en:data", encryptedFiles.data)
  console.log("en:data.réults", encryptedFiles.data.results)

}

fetchAllEncryptedFiles()

</script>

<style lang="scss" scoped></style>
