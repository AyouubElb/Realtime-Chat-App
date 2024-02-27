<template>
  <main>
    <!-- <Navbar v-if="userStore.isAuthenticated" /> -->
    <Sidebar v-if="this.$route.path === '/chat-page'" />
    <router-view />
  </main>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();

const { isAuthenticated } = useAuth0();

onMounted(() => {
  if (userStore) {
    userStore.fetchUserImage();
    userStore.fetchAvatarImages();
  }
});
</script>

<style></style>
