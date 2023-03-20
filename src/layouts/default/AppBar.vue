<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />

      Cloud Encryption
    </v-app-bar-title>
    <v-btn variant="text" icon="mdi-magnify" 
      @click="$router.push('/foo')"
    >Foo</v-btn>

    <v-btn variant="text" icon="mdi-filter"
      @click="$router.push('/bar')"
    >Bar</v-btn>

    <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>

  </v-app-bar>
</template>

<script lang="ts" setup>
  //
</script>
