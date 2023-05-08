<template>
  <div class="decrypt-file">
    <div class="home">
      <h1>
        Giải mã hóa/ Xác thực chữ ký số
      </h1>
    </div>
    <div v-if="decryptedFile.data">
      <v-card class="mx-auto" max-width="800">
        <v-card-title> Input / Đầu vào thuật toán </v-card-title>

        <v-card-actions>
          <v-label>
            Bản mã hóa của tệp gốc - F<sub>encrypted</sub>
          </v-label>
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
              title="Bản mã hóa của tệp gốc"
              :content="decryptedFile.data.fileContents.encryptedFileContent"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label>
            Khóa bí mật của Bob - Private<sub>B</sub>
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.bobPrivateKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.bobPrivateKeyContent = !showOption.bobPrivateKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.bobPrivateKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="Khóa bí mật của Bob"
              :content="decryptedFile.data.fileContents.bobPrivateKeyContent"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label>
            Khóa công khai của Alice - Public<sub>A</sub>
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.alicePublicKeyContent
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="
              showOption.alicePublicKeyContent =
                !showOption.alicePublicKeyContent
            "
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.alicePublicKeyContent">
            <v-divider></v-divider>
            <Terminal
              title="Khóa công khai của Alice"
              :content="decryptedFile.data.fileContents.alicePublicKeyContent"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label>
            Bản mã của khóa bí mật (Blowfish) của
            tệp (E<sub>bf</sub>) <sub>encrypted</sub>
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
              title="Bản mã của khóa bí mật Blowfish của tệp "
              :content="
                decryptedFile.data.fileContents.encryptedFilePrivateKeyContent
              "
            />
          </div>
        </v-expand-transition>

        <v-spacer></v-spacer>

        <v-card-actions>
          <v-label class="text-wrap">
            Giá trị băm của file gốc - Hash<sub>F</sub>
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
              title="Giá trị băm của file gốc"
              :content="decryptedFile.data.hash.originalHash"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label>
            Hash value signature (Chữ ký số của chuỗi băm của file gốc
            Sig(Hash<sub>F</sub>))
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
              title="Hash value signature Content"
              :content="decryptedFile.data.fileContents.signatureContent"
            />
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" max-width="800">
        <v-card-title>
          Các giá trị trung gian
        </v-card-title>

        <v-card-actions>
          <v-label class="text-wrap">
            Khóa bí mật (Blowfish) của tệp cần giải mã - E<sub>bf'</sub>
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
              title="Khóa bí mật (Blowfish) của tệp cần giải mã  "
              :content="decryptedFile.data.fileContents.filePrivateKeyContent"
            />
          </div>
        </v-expand-transition>

        <v-card-actions>
          <v-label class="text-wrap">
            Giá trị băm của tệp đã được giải mã -
            Hash<sub>F</sub><sub>decrypted</sub>
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
              title="Giá trị băm của tệp đã được giải mã "
              :content="decryptedFile.data.hash.decryptedFilehash"
            />
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" max-width="800">
        <v-card-title> Output / Đầu ra thuật toán </v-card-title>
        <v-card-actions>
          <v-label>
            File đã được giải mã - F<sub>decrypted</sub>:
          </v-label>
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showOption.decryptedFile ? 'mdi-chevron-up' : 'mdi-chevron-down'
            "
            @click="showOption.decryptedFile = !showOption.decryptedFile"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showOption.decryptedFile">
            <v-img :src="decryptedFilePath" height="100%" cover></v-img>
            <v-btn class="ma-2" outlined :href="decryptedFilePath" download>
              Download
            </v-btn>
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label class="text-wrap">
            Kết quả so sánh giá trị băm của file gốc và
            file đã được giải mã
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
              title="Kết quả so sánh giá trị băm của file gốc và file đã được giải mã "
              :content="hashValidationContent"
            />
          </div>
        </v-expand-transition>
        <v-card-actions>
          <v-label class="text-wrap">
            Kết quả xác thực chữ ký số của giá
            trị băm của file gốc
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
              title="Kết quả xác thực chữ ký số của giá trị băm của file gốc"
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
  bobPrivateKeyContent: false,
  alicePublicKeyContent: false,
  decryptedFilehash: false,
  originalHash: false,
  hashValidation: true,
  signatureVerification: true,
  decryptedFile: true,
  encryptedFileContent: false,
});

const decryptedFilePath = computed(() => {
  return (
    `${BACKEND_API_URL}/${decryptedFile.data?.decrypt?.decryptedFilePath}` || ""
  );
});

const hashValidationContent = computed(() => {
  const content =
    "Giá trị băm của tệp gốc: "+ decryptedFile.data?.hash?.originalHash +
    "<br/>" +
    (decryptedFile.data?.hash?.isHashEqual
      ? "Bằng nhau/Toàn vẹn với"
      : "Không bằng nhau/Không toàn vẹn") +
    "<br/>" +
    "Giá trị băm của tệp mới giải mã: " + decryptedFile.data?.hash?.decryptedFilehash;
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
