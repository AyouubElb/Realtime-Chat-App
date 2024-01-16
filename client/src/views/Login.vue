<template lang="">
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h2>Log In</h2>
        <form>
          <div class="form-group mb-3">
            <label for="email" class="text-light">email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
            />
          </div>
          <div class="form-group mb-3">
            <label for="password" class="text-light">password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
            />
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-outline-info mt-3" @click.prevent="logIn">
              connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import toastr from "toastr";
import axios from "axios";
const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const logIn = () => {
  axios
    .post(`${userStore.API_URL}/users/login`, {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      toastr.success("User is authenticated SuccessFully", "New Account", {
        positionClass: "toast-bottom-left",
      });
      localStorage.setItem("jwt_info", JSON.stringify(res));
      router.push("/");
    })
    .catch((err) => {
      toastr.error(err, "Server Error!", {
        positionClass: "toast-bottom-left",
      });
    });
  email.value = "";
  password.value = "";
};
</script>

<style lang=""></style>
