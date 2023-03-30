<template>
  <div class="decrypt-file">
    <div class="home">
      <h1>
        Decrypt + Signature Verification (Giải mã hóa/ Xác thực chữ ký số)
      </h1>
    </div>
    <div v-if="decryptedFile.data">
      <v-card class="mx-auto" max-width="800">
        <v-card-title> Input (Đầu vào thuật toán) </v-card-title>

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
              title="System Private Key Content"
              :content="decryptedFile.data.fileContents.systemPrivateKeyContent"
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
              :content="decryptedFile.data.fileContents.systemPublicKeyContent"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label>
            Encrypted File's Private Key  (Khóa bí mật của tệp đã được mã hóa)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.encryptedFilePrivateKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.encryptedFilePrivateKeyContent = !showOption.encryptedFilePrivateKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.encryptedFilePrivateKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="Encrypted File's Private Key Content"
              :content="decryptedFile.data.fileContents.encryptedFilePrivateKeyContent"
            />
          </div>
        </v-expand-transition>

        <v-spacer></v-spacer>

        <v-card-actions>
          <v-label>
            Hash value signature (Chữ ký số của chuỗi băm của file gốc)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.signatureContent ? 'mdi-chevron-up' : 'mdi-chevron-down'
            "
            @click="showOption.signatureContent = !showOption.signatureContent"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.signatureContent">
            <v-divider></v-divider>
            <Terminal
              title="Hash value signature Content"
              :content="decryptedFile.data.fileContents.signatureContent"
            />
          </div>
        </v-expand-transition>

        <v-card-actions>
          <v-label class="text-wrap">
            Original File's Hash (Giá trị băm của file gốc)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.originalHash ? 'mdi-chevron-up' : 'mdi-chevron-down'
            "
            @click="showOption.originalHash = !showOption.originalHash"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.originalHash">
            <v-divider></v-divider>
            <Terminal
              title="Shared Secret Content"
              :content="decryptedFile.data.hash.originalHash"
            />
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" max-width="800">
        <v-card-title>
          Intermediate values (Các giá trị trung gian)
        </v-card-title>

        <v-card-actions>
          <v-label class="text-wrap">
            Shared Secret (Khóa chia sẻ thu được từ giao thức ECDH khóa công
            khai của file và khóa bí của hệ thống)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.filePrivateKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.filePrivateKeyContent = !showOption.filePrivateKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.filePrivateKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="Shared Secret Content"
              :content="decryptedFile.data.fileContents.filePrivateKeyContent"
            />
          </div>
        </v-expand-transition>

        <v-card-actions>
          <v-label class="text-wrap">
            Decrypted File's Hash (Giá trị băm của file đã được giải mã)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.decryptedFilehash
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.decryptedFilehash = !showOption.decryptedFilehash
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.decryptedFilehash">
            <v-divider></v-divider>
            <Terminal
              title="Decrypted File's Hash Content"
              :content="decryptedFile.data.hash.decryptedFilehash"
            />
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" max-width="800">
        <v-card-title> Output (Đầu ra thuật toán) </v-card-title>
        <v-card-actions class="decrypted-file-label">
          <v-label> Decrypted File (File đã được giải mã): </v-label>
          <v-card-subtitle>
            {{ decryptedFile.data.decrypt.decryptedFilePath }}
          </v-card-subtitle>
        </v-card-actions>
        <v-img :src="decryptedFilePath" height="100%" cover></v-img>
        <v-card-actions>
          <v-label class="text-wrap">
            Hash comparison result (Kết quả so sánh giá trị băm của file gốc và
            file đã được giải mã)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.hashValidation ? 'mdi-chevron-up' : 'mdi-chevron-down'
            "
            @click="showOption.hashValidation = !showOption.hashValidation"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.hashValidation">
            <v-divider></v-divider>
            <Terminal
              title="Shared Secret Content"
              :content="hashValidationContent"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label class="text-wrap">
            Signature Verification Result (Kết quả xác thực chữ ký số của giá
            trị băm của file gốc)
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.signatureVerification
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.signatureVerification =
                !showOption.signatureVerification
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.signatureVerification">
            <v-divider></v-divider>
            <Terminal
              title="Shared Secret Content"
              :content="
                decryptedFile.data.verifyRSA.isValid
                  ? 'Verified  (Xác thực chữ ký số thành công)'
                  : 'Not Verified (Xác thực chữ ký số không thành công)'
              "
            />
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import Terminal from "@/components/Terminal.vue";
import HelloWorld from "@/components/HelloWorld.vue";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const router = useRoute();
console.log(router.params.id);
const decryptedFile = reactive({
  data: null,
  error: null,
  loading: false,
});

const showOption = reactive({
  encryptedFileContent: false,
  encryptedFilePrivateKeyContent: false,
  filePrivateKeyContent: false,
  signatureContent: false,
  systemPrivateKeyContent: false,
  systemPublicKeyContent: false,
  decryptedFilehash: false,
  originalHash: false,
  hashValidation: true,
  signatureVerification: true,
});

const decryptedFilePath = computed(() => {
  return (
    `${BACKEND_API_URL}/${decryptedFile.data?.decrypt?.decryptedFilePath}` || ""
  );
});

const hashValidationContent = computed(() => {
  const content =
    decryptedFile.data?.hash?.originalHash +
    "<br/>" +
    (decryptedFile.data?.hash?.isHashEqual
      ? "Equal (Bằng nhau/Toàn vẹn)"
      : "Not Equal (Không bằng nhau/Không toàn vẹn)") +
    "<br/>" +
    decryptedFile.data?.hash?.decryptedFilehash;
  return content;
});

const decryptFileById = async () => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(
    `${BACKEND_API_URL}/v1/encrypts/decrypt?metadataId=${router.params.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      decryptedFile.data = result;
      console.log("decrypted file: ", result);
    })
    .catch((error) => console.log("error", error));
};

decryptFileById();
</script>

<style lang="scss" scoped>
.decrypted-file-label {
  flex-direction: column;
  align-items: flex-start;
}
</style>
