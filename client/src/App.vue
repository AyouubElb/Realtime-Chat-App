<template>
  <main>
    <!-- <Navbar v-if="userStore.isAuthenticated" /> -->
    <Sidebar v-if="userStore.isAuthenticated" />
    <router-view />
  </main>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();
</script>

<style></style>
