<template lang="">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid container">
      <router-link class="nav-link text-light mt-2" to="/">
        <h4>ChattApp</h4>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-4"></ul>
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0 mx-4">
          <li class="nav-item mx-2" v-if="!isAuthenticated()">
            <router-link class="nav-link text-light" to="/login"
              >Login</router-link
            >
          </li>
          <li class="nav-item" v-if="!isAuthenticated()">
            <router-link class="nav-link text-light" to="/register"
              >Register</router-link
            >
          </li>
          <li class="nav-item mx-2" v-if="isAuthenticated()">
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
import { API_URL } from "../config";
import toastr from "toastr";
import axios from "axios";

const isAuthenticated = () => {
  const jwt = localStorage.getItem("jwt_info");
  if (jwt) {
    return JSON.parse(jwt);
  }

  return false;
};

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

<style lang=""></style>
