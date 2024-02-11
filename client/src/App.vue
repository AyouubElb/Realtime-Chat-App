<template>
  <main>
    <!-- <Navbar v-if="userStore.isAuthenticated" /> -->
    <Sidebar v-if="this.$route.path === '/'" />
    <router-view />
  </main>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();

onMounted(() => {
  if (userStore) {
    console.log("userStore", userStore);
    userStore.fetchUserImage();
    userStore.fetchAvatarImages();
  }
});
</script>

<style></style>
