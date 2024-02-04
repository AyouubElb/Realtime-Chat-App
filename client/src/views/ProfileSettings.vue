<template>
  <div class="profile-setting-container">
    <div class="log-out">
      <button @click="logOut">
        Log Out
        <i class="bi bi-box-arrow-in-down-right"></i>
      </button>
    </div>
    <div class="account">
      <div class="account-icon-username">
        <!-- <div class="account-icon">
          <div>
            <i class="bi bi-pencil-fill"></i>
          </div>
        </div> -->
        <div class="icon-container">
          <img
            :src="require('../assets/nftIcon.svg')"
            alt=""
            @mouseover="showPencil()"
            @mouseleave="hidePencil()"
          />
          <div class="icon-content" v-if="editIcon">
            <i class="bi bi-pencil-fill"></i>
          </div>
        </div>
        <p>{{ userStore.user.name }}</p>
      </div>
      <div class="account-info">
        <div class="account-info-header">
          <div class="title">My Profile</div>
          <div class="close-profile-setting">
            <router-link to="/">
              <i class="bi bi-x-circle"></i>
            </router-link>
          </div>
        </div>
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
        <hr />
        <div class="password-item">
          <div class="password-header-text">Password and Authentication</div>
          <div class="edit-password-btn">
            <button>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { API_URL } from "../config";
import toastr from "toastr";
import axios from "axios";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
const editIcon = ref(false);

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

const showPencil = () => {
  editIcon.value = true;
};
const hidePencil = () => {
  editIcon.value = false;
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
.account {
  /* width: max(45%, 600px); */
  display: flex;
  /* padding: 1rem; */
  margin-bottom: auto;
  border-radius: 6px;
  background-color: #1d1f25;
}
.account-icon-username {
  display: flex;
  min-width: 150px;
  flex-direction: column;
  padding: 1rem 0;
}
.icon-container {
  position: relative;
  margin-bottom: 6px;
}
.icon-container img {
  width: 5rem;
  border-radius: 50%;
  cursor: pointer;
  margin-inline: auto;
  transition: box-shadow 0.3s ease;
}
.icon-container .icon-content {
  display: flex;
  height: 100%;
  width: 5rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  font-size: 24px;
}
.icon-container .icon-content i {
  margin: auto;
}
.account-icon-username p {
  font-size: 1.25rem;
  font-weight: 600;
  margin-inline: auto;
}
.account-info {
  width: 500px;
  background-color: #282a30;
  border-radius: 6px;
  padding: 2rem;
}
.account-info-item {
  display: flex;
  margin-bottom: 1rem;
}

.account-info-header,
.account {
  margin-inline: auto;
}
.account-info-header {
  display: flex;
  margin-bottom: 2rem;
}
.account-info-header .title {
  font-size: 1.25rem;
  font-weight: 600;
}
.close-profile-setting {
  margin-left: auto;
}
.close-profile-setting i {
  font-size: 32px;
  cursor: pointer;
  color: white;
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
hr {
  margin: 2rem 0;
}
.password-header-text {
  color: #f0f0f0;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.edit-password-btn button {
  padding: 5px 14px;
  border-radius: 4px;
  border: #1b67d3 1px solid;
  background-color: #1b67d3;
  color: white;
  font-size: 14px;
}
.edit-password-btn button:hover {
  background-color: #1560bd;
}
</style>
