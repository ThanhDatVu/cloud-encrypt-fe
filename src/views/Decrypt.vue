<template>
  <div class="encrypted-files">
    <div class="home">
      <h1>Decrypt</h1>

    </div>
    <div v-if="decryptedFile.data">
      <v-card class="mx-auto" max-width="344">
      <v-img :src="decryptedFilePath" height="200px" cover></v-img>

      <v-card-title>
        Top western road trips
      </v-card-title>

      <v-card-subtitle>
        1,000 miles of wonder
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text">
          Explore
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn :icon="showOption.filePublicKey ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="showOption.filePublicKey = !showOption.filePublicKey"></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="showOption.filePublicKey">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you
            add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

const router = useRoute()
console.log(router.params.id)
const decryptedFile = reactive({
  data: null,
  error: null,
  loading: false,
})

const showOption = reactive({
  filePublicKey: false,
})

const decryptedFilePath = computed(() => {
  return `${BACKEND_API_URL}/${decryptedFile.data.dercypt.decryptedFilePath}` || ""
})


const decryptFileById = async () => {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  fetch(`${BACKEND_API_URL}/v1/encrypts/decryptBlowfish?metadataId=${router.params.id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      decryptedFile.data = result;
      console.log("decrypted file: ", result)
    })
    .catch(error => console.log('error', error));

}

decryptFileById()

</script>

<style lang="scss" scoped></style>
