<template>
  <main>
    <Navbar v-if="userStore.isAuthenticated" />
    <router-view />
  </main>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();
</script>

<style></style>
