<template>
  <div class="profile-setting-container">
    <div class="profile-setting-header">
      <div class="title">My Account</div>
      <div class="close-profile-setting">
        <i class="bi bi-x-circle"></i>
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
            <button class="edit-btn">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
</script>
<style>
.profile-setting-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #3a4042;
}
.profile-setting-header,
.account {
  margin-inline: auto;
}
.profile-setting-header {
  display: flex;
  width: 400px;
}
.profile-setting-header .title {
  font-size: 1.25rem;
  font-weight: 600;
}
.close-profile-setting {
  margin-left: auto;
  margin-right: -2rem;
}
.close-profile-setting i {
  font-size: 32px;
}
.account {
  width: 400px;
  padding: 1rem;
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
}
</style>
