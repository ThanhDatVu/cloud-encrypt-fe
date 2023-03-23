<template>
  <div class="encrypt-file">
    <div class="home">
      <h1>Encryption/ Digital Sign (Mã hóa/Ký số)</h1>
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
    <div v-if="encryptedFile.data" class="mt-2">
      <h1>Encryption/ Digital Sign Result (Kết quả mã hóa/ Ký số)</h1>
      
      <v-card class="mx-auto" max-width="800">
        <v-card-title> Input (Đầu vào thuật toán) </v-card-title>
        <v-label> Input File (Tệp đầu vào) </v-label>
        <v-img :src="uploadedFilePath" height="100%" cover></v-img>
        <v-card-actions>
          <v-label> System Private Key (Khóa bí mật của hệ thống) </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.systemPrivateKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.systemPrivateKeyContent =
                !showOption.systemPrivateKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.systemPrivateKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="File's Public Key Content"
              :content="encryptedFile.data.fileContents.systemPrivateKeyContent"
            />
          </div>
        </v-expand-transition>

        <v-card-actions>
          <v-label> System Public Key (Khóa công khai của hệ thống) </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.systemPublicKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.systemPublicKeyContent =
                !showOption.systemPublicKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.systemPublicKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="File's Public Key Content"
              :content="encryptedFile.data.fileContents.systemPublicKeyContent"
            />
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" max-width="800">
        <v-card-title>
          Intermediate values (Các giá trị trung gian)
        </v-card-title>

        <v-card-actions>
          <v-label>
            File's Private Key (Khóa bí mật của tệp cần mã hóa)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.filePrivateKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.filePrivateKeyContent =
                !showOption.filePrivateKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.filePrivateKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="File's Public Key Content"
              :content="encryptedFile.data.fileContents.filePrivateKeyContent"
            />
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" max-width="800">
        <v-card-title> Output (Đầu ra thuật toán) </v-card-title>
        <v-card-actions>
          <v-label>
            File's Public Key (Khóa công khai của tệp cần mã hóa)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.filePublicKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.filePublicKeyContent = !showOption.filePublicKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.filePublicKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="File's Public Key Content"
              :content="encryptedFile.data.fileContents.filePublicKeyContent"
            />
          </div>
        </v-expand-transition>

        <v-card-actions>
          <v-label> File's Hash Value (Giá trị băm của tệp gốc) </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.hashContent ? 'mdi-chevron-up' : 'mdi-chevron-down'
            "
            @click="showOption.hashContent = !showOption.hashContent"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.hashContent">
            <v-divider></v-divider>
            <Terminal
              title="File's Public Key Content"
              :content="encryptedFile.data.hash.originalHash"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label>
            Hash value signature (Chữ ký số của chuỗi băm của file gốc)</v-label
          >
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.signatureContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="showOption.signatureContent = !showOption.signatureContent"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.signatureContent">
            <v-divider></v-divider>
            <Terminal
              title="File's Public Key Content"
              :content="encryptedFile.data.fileContents.signatureContent"
            />
          </div>
        </v-expand-transition>
        <router-link :to="decryptedFileUrl">
          <v-btn color="primary" class="mx-auto" max-width="800">
            Go to page to decrypt this file (Đi đến trang giải mã tệp này)
          </v-btn>
        </router-link>
        <v-card-subtitle>File ID: {{ encryptedFile.data.metadata.id }}</v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import Terminal from "@/components/Terminal.vue";
import { reactive, ref, computed } from "vue";
import { useRoute } from "vue-router";
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const router = useRoute();

const uploadFile = reactive({
  data: null,
  error: null,
  loading: false,
});

const encryptedFile = reactive({
  data: null,
  error: null,
  loading: false,
});

const showOption = reactive({
  systemPrivateKeyContent: false,
  systemPublicKeyContent: false,
  filePublicKeyContent: false,
  filePrivateKeyContent: false,
  sharedSecretContent: false,
  signatureContent: false,
  hashContent: false,
});

const file = ref(null);

const uploadedFilePath = computed(() => {
  return `${BACKEND_API_URL}/${uploadFile.data.path}` || "";
});

const decryptedFileUrl = computed(() => {
  return `/decrypt/${encryptedFile.data.metadata.id}`;
});

const handleUploadAttachment = async (event) => {
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
      console.log("encryptedFile: ", result);
      encryptedFile.data = result;
    })
    .catch((error) => console.log("error", error));
};
</script>

<style lang="scss" scoped></style>
