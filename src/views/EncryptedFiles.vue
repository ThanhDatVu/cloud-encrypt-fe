<template>
  <div class="encrypted-files">
    <div v-if="encryptedFiles">
      <h1>Encrypted Files List</h1>
      <v-container>
        <v-row>
          <v-col v-for="encryptedFile in encryptedFiles.data?.results" :key="encryptedFile.id" cols="4">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <div>File Name: </div>
                  </v-col>
                  <v-col cols="7">
                    <div>{{ encryptedFile.fileName }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div>Hash Value: </div>
                  </v-col>
                  <v-col cols="7">
                    <div>{{ encryptedFile.hashValue }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div>signaturePath: </div>
                  </v-col>
                  <v-col cols="7">
                    <div>{{ encryptedFile.signaturePath }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div>publicFileKeyPath: </div>
                  </v-col>
                  <v-col cols="7">
                    <div>{{ encryptedFile.publicFileKeyPath }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn variant="text" color="deep-purple-accent-4" @click="$router.push(`/decrypt/${encryptedFile.id}`)">
                  Decrypt
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL
// import { BACKEND_API_URL } from '../../config'
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()
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

  await fetch(`${BACKEND_API_URL}/v1/metadata?sortBy=-createdAt`, requestOptions)
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
