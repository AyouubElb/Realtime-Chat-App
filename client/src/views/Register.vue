<template lang="">
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h2>Register</h2>
        <form>
          <div class="form-group mb-3">
            <label for="name" class="text-light">name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="user.name"
            />
          </div>
          <div class="form-group mb-3">
            <label for="email" class="text-light">email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="user.email"
            />
          </div>
          <div class="form-group mb-3">
            <label for="password" class="text-light">password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
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
<script>
import { API_URL } from "../config";
import toastr from "toastr";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.user),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            toastr.warning(res.error, "Please check form !", {
              positionClass: "toast-bottom-left",
            });
          } else {
            toastr.success("User is created SuccessFully", "New Account", {
              positionClass: "toast-bottom-left",
            });
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          toastr.error(err, "Server Error!", {
            positionClass: "toast-bottom-left",
          });
        });
    },
  },
};
</script>
<style lang=""></style>
