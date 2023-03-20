<template>
  <div class="encrypted-files">
    <div class="home">
      <h1>bar</h1>
      <v-form enctype="multipart/formdata" @submit.prevent="handleUploadAttachment" >
        <v-file-input  ref="file" label="File input">File to encrypt</v-file-input>
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-form>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
const router = useRoute()
console.log(router.params.id)
const encryptedFiles = reactive({
  data: null,
  error: null,
  loading: false,
})
const file = ref(null)






const handleUploadAttachment = async (event) => {
  console.log("event", event);
  console.log("file", file.value.files);
  

  var formdata = new FormData();
  formdata.append("files", file.value.files[0]);
  console.log("formData", formdata);
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/v1/attachments", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

</script>

<style lang="scss" scoped></style>
