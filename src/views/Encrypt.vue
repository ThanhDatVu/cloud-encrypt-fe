<template>
  <div class="encrypt-file">
    <v-card class="mx-auto mt-3" max-width="800">
      <h1>Encryption/ Digital Sign (Mã hóa/Ký số)</h1>
      <v-label class="ml-3"> Nhập tệp đầu vào - F </v-label>
      <v-form
        enctype="multipart/formdata"
        @submit.prevent="handleUploadAttachment"
      >
        <v-file-input ref="file" label="File input"
          >File to encrypt</v-file-input
        >
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-form>
    </v-card>
    <div v-if="encryptedFile.data" class="mt-2">
      <v-card class="mx-auto" max-width="800">
      <h1>Kết quả mã hóa/ Ký số</h1>
        <v-card-title> Input / Đầu vào thuật toán </v-card-title>
        <v-card-actions>
          <v-label> Tệp đầu vào - F </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.originalFile ? 'mdi-chevron-up' : 'mdi-chevron-down'
            "
            @click="showOption.originalFile = !showOption.originalFile"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.originalFile">
            <v-img :src="uploadedFilePath" height="100%" cover></v-img>
            <v-btn class="ma-2" outlined :href="uploadedFilePath" download>
              Download
            </v-btn>
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label> Khóa bí mật (RSA) của Alice - Private<sub>A</sub> </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.alicePrivateKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.alicePrivateKeyContent =
                !showOption.alicePrivateKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.alicePrivateKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="Khóa bí mật (RSA) của Alice "
              :content="encryptedFile.data.fileContents.alicePrivateKeyContent"
            />
          </div>
        </v-expand-transition>

        <v-card-actions>
          <v-label> Khóa công khai (RSA) của Bob - Public<sub>B</sub></v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.bobPublicKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.bobPublicKeyContent = !showOption.bobPublicKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.bobPublicKeyContent">
            <v-divider></v-divider>
            <Terminal
              title=" Khóa công khai (RSA) của Bob"
              :content="encryptedFile.data.fileContents.bobPublicKeyContent"
            />
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" max-width="800">
        <v-card-title> Các giá trị trung gian </v-card-title>

        <v-card-actions>
          <v-label>
            Khóa bí mật (Blowfish) của tệp cần mã hóa - E<sub>bf</sub>
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
              title="Khóa bí mật (Blowfish) của tệp cần mã hóa"
              :content="encryptedFile.data.fileContents.filePrivateKeyContent"
            />
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" max-width="800">
        <v-card-title> Output (Đầu ra thuật toán) </v-card-title>
        <v-card-actions>
          <v-label> Bản mã hóa của tệp gốc - F<sub>encrypted</sub> </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.encryptedFileContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.encryptedFileContent = !showOption.encryptedFileContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.encryptedFileContent">
            <v-divider></v-divider>
            <Terminal
              title=" Bản mã hóa của tệp gốc"
              :content="encryptedFile.data.fileContents.encryptedFileContent"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label class="">
            Khoá bí mật (Blowfish) của tệp đã được mã hóa bằng khóa công khai của Bob -
            (E<sub>bf</sub>) <sub>encrypted</sub>
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.encryptedFilePrivateKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.encryptedFilePrivateKeyContent =
                !showOption.encryptedFilePrivateKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.encryptedFilePrivateKeyContent">
            <v-divider></v-divider>
            <Terminal
              title=" Khoá bí mật (Blowfish) của tệp đã được mã hóa bằng khóa công khai của Bob"
              :content="
                encryptedFile.data.fileContents.encryptedFilePrivateKeyContent
              "
            />
          </div>
        </v-expand-transition>

        <v-card-actions>
          <v-label>Giá trị băm của tệp gốc - Hash<sub>F</sub> </v-label>
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
              title="Giá trị băm của tệp gốc"
              :content="encryptedFile.data.hash.originalHash"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label>
            Chữ ký số của chuỗi băm của file gốc Sig(Hash<sub>F</sub>)
          </v-label>
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
              title="Chữ ký số của chuỗi băm của file gốc "
              :content="encryptedFile.data.fileContents.signatureContent"
            />
          </div>
        </v-expand-transition>
        <router-link :to="decryptedFileUrl">
          <v-btn color="primary" class="mx-auto" max-width="800">
            Đi đến trang giải mã tệp này
          </v-btn>
        </router-link>
        <v-card-subtitle class="mt-2"
          >File ID: {{ encryptedFile.data.metadata.id }}</v-card-subtitle
        >
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
  encryptedFileContent: false,
  encryptedFilePrivateKeyContent: false,
  filePrivateKeyContent: false,
  signatureContent: false,
  alicePrivateKeyContent: false,
  bobPublicKeyContent: false,
  hashContent: false,
  originalFile: true,
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
  if (!file.value.files[0]) {
    alert("Vui lòng chọn tệp tin/Please select a file");
    return;
  }
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
    .catch((error) => {
      console.log("error", error);
      alert("Có lỗi xảy ra ở bước upload tệp tin");
    });

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

  await fetch(`${BACKEND_API_URL}/v1/encrypts/encrypt`, encryptHeader)
    .then((response) => response.json())
    .then((result) => {
      console.log("encryptedFile: ", result);
      encryptedFile.data = result;
    })
    .catch((error) => {
      console.log("error", error);
      alert("Có lỗi xảy ra ở bước yêu cầu mã hóa tệp tin");
    });
};
</script>

<style lang="scss" scoped>
.encrypted-file-label {
  flex-direction: column;
  align-items: flex-start;
}
</style>
