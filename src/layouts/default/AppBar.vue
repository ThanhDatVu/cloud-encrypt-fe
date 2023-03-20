<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />

      Cloud Encryption
    </v-app-bar-title>
    <v-btn variant="text"
      @click="$router.push('/encrypt')"
    >Encrypt</v-btn>
    <v-btn variant="text" 
      @click="$router.push('/encrypted-files')"
    >Encrypted Files List</v-btn>

    <v-btn variant="text"
      @click="$router.push('/decrypt')"
    >Decrypt</v-btn>

    <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>

  </v-app-bar>
</template>

<script lang="ts" setup>
  //
</script>
