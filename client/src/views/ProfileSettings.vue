<template>
  <div class="profile-setting-container">
    <div class="log-out">
      <button @click="logOut">
        Log Out
        <i class="bi bi-box-arrow-in-down-right"></i>
      </button>
    </div>
    <div class="profile-setting-header">
      <div class="title">My Profile</div>
      <div class="close-profile-setting">
        <router-link to="/">
          <i class="bi bi-x-circle"></i>
        </router-link>
      </div>
    </div>
    <div class="account">
      <div>
        <div class="account-icon-username">
          <img :src="require('../assets/nftIcon.svg')" alt="" />
          <p>{{ userStore.user.name }}</p>
        </div>
        <div class="account-info">
          <div class="account-info-item">
            <div class="account-info-text">
              <div class="account-info-title">Username</div>
              <div class="account-info-value">{{ userStore.user.name }}</div>
            </div>
            <div class="edit-add-info">
              <button>Edit</button>
            </div>
          </div>
          <div class="account-info-item">
            <div class="account-info-text">
              <div class="account-info-title">Email</div>
              <div class="account-info-value">{{ userStore.user.email }}</div>
            </div>
            <div class="edit-add-info">
              <button>Edit</button>
            </div>
          </div>
          <div class="account-info-item">
            <div class="account-info-text">
              <div class="account-info-title">Phone Number</div>
              <div class="account-info-value">
                You haven't added a phone number yet.
              </div>
            </div>
            <div class="edit-add-info">
              <button>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { API_URL } from "../config";
import toastr from "toastr";
import axios from "axios";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

const logOut = () => {
  axios
    .get(`${API_URL}/users/signout`)
    .then(() => {
      toastr.info("User Signout", "See You Next Time", {
        positionClass: "toast-bottom-left",
      });
      localStorage.removeItem("jwt_info");
      // this.$socket.disconnect();
      // this.$router.push("/login-signup");
    })
    .catch();
};
</script>
<style>
.profile-setting-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #3a4042;
}
.log-out {
  margin: 1rem 2rem auto auto;
}
.log-out button {
  padding: 5px 8px;
  border-radius: 4px;
}
.profile-setting-header,
.account {
  margin-inline: auto;
}
.profile-setting-header {
  display: flex;
  width: max(45%, 600px);
  margin-bottom: 1rem;
}
.profile-setting-header .title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: auto;
}
.close-profile-setting {
  margin-left: auto;
  margin-right: -2rem;
}
.close-profile-setting i {
  font-size: 32px;
  cursor: pointer;
  color: white;
}
.account {
  width: max(45%, 600px);
  padding: 1rem;
  margin-bottom: auto;
  border-radius: 6px;
  background-color: #1d1f25;
}
.account-icon-username {
  display: flex;
  margin-bottom: 1rem;
}
.account-icon-username img {
  width: 4rem;
  border-radius: 50%;
  margin-left: 1rem;
}
.account-icon-username p {
  font-size: 1.25rem;
  font-weight: 600;
  margin-left: 1rem;
  margin-top: auto;
  margin-bottom: auto;
}
.account-info {
  background-color: #282a30;
  border-radius: 6px;
  padding: 1rem;
}
.account-info-item {
  display: flex;
  margin-bottom: 1rem;
}
.account-info-title {
  color: #d3d3d3;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
}
.edit-add-info {
  margin: auto 0 auto auto;
}
.edit-add-info button {
  font-size: 14px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 4px;
}
</style>
