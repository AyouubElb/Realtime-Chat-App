<template lang="">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid container">
      <router-link class="nav-link text-light mt-2" to="/">
        <h4>ChattApp</h4>
      </router-link>
      <span class="text-warning">Logged in as UserName</span>
      <div class="navbar-collapse ml-auto">
        <ul class="navbar-nav mb-2 mx-4">
          <li class="nav-item mx-2">
            <span
              class="nav-link text-light"
              style="cursor: pointer"
              @click="signOut"
              >SignOut
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref } from "vue";
import { API_URL } from "../config";
import toastr from "toastr";
import axios from "axios";

const signOut = () => {
  axios
    .get(`${API_URL}/users/signout`)
    .then(() => {
      toastr.info("User Signout", "See You Next Time", {
        positionClass: "toast-bottom-left",
      });
      localStorage.removeItem("jwt_info");
      this.$socket.disconnect();
      this.$router.push("/login");
    })
    .catch();
};
</script>

<style>
.navbar-collapse {
  /* make it take only the width of its content(important for ml-auto) */
  flex-grow: 0 !important;
}
</style>
