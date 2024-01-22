<template lang="">
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h2>Register</h2>
        <form>
          <div class="form-group mb-3">
            <label for="name" class="text-light">name</label>
            <input type="text" class="form-control" id="name" v-model="name" />
          </div>
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
            <button class="btn btn-outline-info mt-3" @click.prevent="register">
              submit
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

const name = ref("");
const email = ref("");
const password = ref("");

const register = () => {
  axios
    .post(`${userStore.API_URL}/users/register`, {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      toastr.success("User is created SuccessFully", "New Account", {
        positionClass: "toast-bottom-left",
      });
      router.push("/login");
    })
    .catch((err) => {
      toastr.error(err, "Server Error!", {
        positionClass: "toast-bottom-left",
      });
    });
};
</script>

<style lang=""></style>
