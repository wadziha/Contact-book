<template>
  <v-app>
    <v-main class="main">
      <v-container>
        <v-layout flat class="justify-center ma-15">
          <v-toolbar-title><h1>Offline contact book</h1></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-layout>

        <ContactList />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ContactList from './components/ContactList.vue'

export default {
  name: 'App',
  components: {
    ContactList,
  },
}
</script>

<style>
.main {
  background: linear-gradient(to left top, #17428a, #6d0fe5, #e50775);
}
</style>
