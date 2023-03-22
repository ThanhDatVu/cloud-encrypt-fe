<template>
  <div class="encrypted-files">
    <div class="home">
      <h1>bar</h1>
      <v-form
        enctype="multipart/formdata"
        @submit.prevent="handleUploadAttachment"
      >
        <v-file-input ref="file" label="File input"
          >File to encrypt</v-file-input
        >
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const router = useRoute();

const encryptedFiles = reactive({
  data: null,
  error: null,
  loading: false,
});

const uploadFile = reactive({
  data: null,
  error: null,
  loading: false,
});

const encryptFile = reactive({
  data: null,
  error: null,
  loading: false,
});

const file = ref(null);

const handleUploadAttachment = async (event) => {
  console.log("event", event);
  console.log("file", file.value.files);

  // 1. Upload file
  var formdata = new FormData();
  formdata.append("files", file.value.files[0]);
  console.log("formData", formdata);
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  let filename;
  await fetch(`${BACKEND_API_URL}/v1/attachments`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result[0]);
      filename = result[0].filename;
      uploadFile.data = result[0];
    })
    .catch((error) => console.log("error", error));

  // 2. Encrypt file using file name from step 1.
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    inputFile: filename,
  });

  const encryptHeader = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(`${BACKEND_API_URL}/v1/encrypts/blowfish`, encryptHeader)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      encryptFile.data = result[0];
    })
    .catch((error) => console.log("error", error));
};
</script>

<style lang="scss" scoped></style>
