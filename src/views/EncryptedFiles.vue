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
                    <div>File Name (Tên tệp): </div>
                  </v-col>
                  <v-col cols="7">
                    <div>{{ encryptedFile.fileName }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div>Signature Path (Đường dẫn đến chữ ký số giá trị băm): </div>
                  </v-col>
                  <v-col cols="7">
                    <div>{{ encryptedFile.signaturePath }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div>Encrypted File Key (Đường dẫn đến bản mã hóa của khóa mã hóa tệp) : </div>
                  </v-col>
                  <v-col cols="7">
                    <div>{{ encryptedFile.encryptedFileKey }}</div>
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
        <v-row justify="center">
          <v-col cols="8" v-if="encryptedFiles.data">
            <v-container class="max-width">
              <v-pagination
                v-model="pagination.page"
                class="my-4"
                :length="encryptedFiles.data.totalPages"
                @input="updatePage"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL
// import { BACKEND_API_URL } from '../../config'
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()
const encryptedFiles = reactive({
  data: null,
  error: null,
  loading: false,
})

const pagination = reactive({
  page: 1,
  itemsPerPage: 10,
  sortBy: 'createdAt',
  sortDesc: true,
  search: '',
})

//write logic for pagination
const updatePage =  async (pageIndex) => {
  console.log("pageIndex", pageIndex);
  fetchAllEncryptedFiles(pagination)
}



const fetchAllEncryptedFiles = async (pagination) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  console.log("pagination", pagination)

  const url = `${BACKEND_API_URL}/v1/metadata?page=${pagination?.page}&size=${pagination?.itemsPerPage}&sortBy=${pagination?.sortBy}&sortDesc=${pagination?.sortDesc}&search=${pagination?.search}`

  await fetch(url , requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      encryptedFiles.data = result

    })
    .catch(error => console.log('error', error));
  console.log("en:data", encryptedFiles.data)
  console.log("en:data.réults", encryptedFiles.data.results)

}

fetchAllEncryptedFiles(pagination)

watch(() => pagination.page, (newVal, oldVal) => {
  console.log("newVal", newVal)
  console.log("oldVal", oldVal)
  updatePage(newVal)
})

</script>

<style lang="scss" scoped></style>
