<template lang="">
  <div class="log-in-container">
    <div class="wrapper" :class="{ active: isActive }">
      <div class="form-wrapper sign-in">
        <form>
          <h2>Login</h2>
          <div class="input-group">
            <input type="text" v-model="email" required />
            <label for="">Email</label>
          </div>
          <div class="input-group">
            <input type="password" v-model="password" required />
            <label for="">Password</label>
          </div>
          <div class="remember">
            <label><input type="checkbox" /> Remember me</label>
          </div>
          <button type="submit" @click.prevent="logIn">Login</button>
          <div class="signUp-link">
            <p>
              Don't have an account?
              <a href="#" class="signUpBtn-link" @click="isActive = true"
                >Sign Up</a
              >
            </p>
          </div>
        </form>
      </div>
      <div class="form-wrapper sign-up">
        <form action="">
          <h2>Sign Up</h2>
          <div class="input-group">
            <input type="text" required />
            <label for="">Username</label>
          </div>
          <div class="input-group">
            <input type="email" required />
            <label for="">Email</label>
          </div>
          <div class="input-group">
            <input type="password" required />
            <label for="">Password</label>
          </div>
          <div class="remember">
            <label
              ><input type="checkbox" /> I agree to the terms &
              conditions</label
            >
          </div>
          <button type="submit">Sign Up</button>
          <div class="signUp-link">
            <p>
              Already have an account?
              <a href="#" class="signInBtn-link" @click="isActive = false"
                >Sign In</a
              >
            </p>
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
const isActive = ref(false);

const logIn = () => {
  console.log(email.value, password.value);
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

<style>
.log-in-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: #000;
}
.wrapper {
  position: relative;
  width: 400px;
  padding: 2.5rem 3rem;
  background: #000;
  box-shadow: 0 0 30px #0ef;
  border-radius: 20px;
  overflow: hidden;
}
.wrapper:hover {
  animation: animate 1s linear infinite;
}
@keyframes animate {
  100% {
    filter: hue-rotate(360deg);
  }
}
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  transition: transform 1s ease-in-out;
}
.wrapper.active .form-wrapper.sign-in {
  transform: translateY(-450px);
}
.wrapper .form-wrapper.sign-up {
  position: absolute;
  top: 450px;
  left: 0;
}
.wrapper.active .form-wrapper.sign-up {
  transform: translateY(-450px);
}
h2 {
  font-size: 30px;
  color: #fff;
  text-align: center;
}
.input-group {
  position: relative;
  margin: 30px 0;
  border-bottom: 2px solid #fff;
}
.input-group label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}
.input-group input {
  width: 290px;
  height: 40px;
  font-size: 1rem;
  color: #fff;
  padding: 0 5px;
  background: transparent;
  border: none;
  outline: none;
}
.input-group input:focus ~ label,
.input-group input:valid ~ label {
  top: -5px;
}
.remember {
  margin: -5px 0 15px 5px;
}
.remember label {
  color: #fff;
  font-size: 14px;
}
.remember label input {
  accent-color: #0ef;
}
button {
  position: relative;
  width: 100%;
  height: 40px;
  background: #0ef;
  box-shadow: 0 0 10px #0ef;
  font-size: 16px;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  border-radius: 30px;
  border: none;
  outline: none;
}
.signUp-link {
  font-size: 14px;
  text-align: center;
  margin: 15px 0;
}
.signUp-link p {
  color: #fff;
}
.signUp-link p a {
  color: #0ef;
  text-decoration: none;
  font-weight: 500;
}
.signUp-link p a:hover {
  text-decoration: underline;
}
</style>
