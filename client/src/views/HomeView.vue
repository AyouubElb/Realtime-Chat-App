<template>
  <Navbar />
</template>
<script setup>
import Navbar from "@/components/Navbar.vue";
import { useAuth0 } from "@auth0/auth0-vue";

const { isAuthenticated, user } = useAuth0();
if (isAuthenticated) {
  console.log("USER", user);
}
</script>
<style></style>
