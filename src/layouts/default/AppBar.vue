<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-lock" />
      Cloud Encryption
    </v-app-bar-title>
    <v-btn variant="text" @click="$router.push('/encrypt')">Encrypt</v-btn>
    <v-btn variant="text" @click="$router.push('/encrypted-files')">Encrypted Files List</v-btn>

    <v-btn @click="toggleTheme">
      <v-icon icon="mdi-weather-night" />
    </v-btn>

  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
