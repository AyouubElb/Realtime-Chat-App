<template>
  <div class="profile-setting-container">
    <div class="log-out">
      <button @click="handleLogout">
        Log Out
        <i class="bi bi-box-arrow-in-down-right"></i>
      </button>
    </div>
    <div class="account">
      <div class="setting-sider">
        <div
          class="icon-container"
          data-bs-toggle="modal"
          data-bs-target="#ImageProfileModal"
          @mouseover="showPencil()"
          @mouseleave="hidePencil()"
        >
          <img :src="userStore.profileImageUrl" />
          <div class="icon-content" v-if="editIcon">
            <i class="bi bi-pencil-fill"></i>
          </div>
        </div>
        <ImageProfileModal />
        <p>{{ username }}</p>
      </div>
      <div class="account-info">
        <div class="account-info-header">
          <div class="title">My Profile</div>
          <div class="close-profile-setting">
            <router-link to="/chat-page">
              <i class="bi bi-x-circle"></i>
            </router-link>
          </div>
        </div>
        <div
          class="account-info-item"
          v-for="(info, index) in accountInfo"
          :key="index"
        >
          <div class="account-info-text">
            <div class="account-info-title">{{ info.title }}</div>
            <div class="account-info-value">{{ info.value }}</div>
          </div>
          <div class="edit-add-info">
            <button
              type="button"
              data-bs-toggle="modal"
              :data-bs-target="dynamicModalTarget(info.id)"
            >
              {{ info.isEmpty ? "Add" : "Edit" }}
            </button>
          </div>
          <UserInfoModal :info="info" />
        </div>
        <hr />
        <div class="password-item">
          <div class="password-header-text">Password and Authentication</div>
          <div class="edit-password-btn">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#changePassswordModal"
            >
              Change Password
            </button>
          </div>
          <ChangePasswordModal />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import UserInfoModal from "@/components/modals/UserInfoModal";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import ImageProfileModal from "@/components/modals/ImageProfileModal";
import { ref, reactive, watchEffect, onMounted } from "vue";
import { API_URL } from "@/config";
import toastr from "toastr";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const { logout } = useAuth0();

const editIcon = ref(false);
const username = ref(userStore.user.username);
const accountInfo = reactive([
  { id: 1, title: "username", value: userStore.user.username, isEmpty: false },
  { id: 2, title: "email", value: userStore.user.email, isEmpty: false },
  {
    id: 3,
    title: "phone number",
    value: "You haven't added a phone number yet.",
    isEmpty: true,
  },
]);

const dynamicModalTarget = (id) => {
  return `#userInfoModal${id}`;
};

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
  // axios
  //   .get(`${userStore.API_URL}/users/signout`)
  //   .then(() => {
  //     toastr.info("User Signout", "See You Next Time", {
  //       positionClass: "toast-bottom-left",
  //     });
  //     localStorage.removeItem("jwt_info");
  //     // this.$socket.disconnect();
  //     // this.$router.push("/login-signup");
  //   })
  //   .catch();
};

const showPencil = () => {
  editIcon.value = true;
};
const hidePencil = () => {
  editIcon.value = false;
};

watchEffect(() => {
  username.value = accountInfo[0].value;
});
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
.setting-sider {
  display: flex;
  min-width: 150px;
  flex-direction: column;
  padding: 2rem 0;
}
.icon-container {
  position: relative;
  margin-bottom: 6px;
  margin-inline: auto;
}
.icon-container img {
  width: 5rem;
  border-radius: 50%;
  cursor: pointer;
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
.setting-sider p {
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

/* Modal */

.modal-content {
  color: white;
  background-color: #3a4042;
  border-radius: 6px;
}
.modal-title {
  font-weight: 600;
  font-size: 1.5rem;
}
.modal-body {
  padding: 2rem;
}
.modal-body-title {
  text-transform: UPPERCASE;
  color: #d3d3d3;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}
.modal-body input {
  width: 100%;
  border-radius: 3px;
  padding: 4px 8px;
  background-color: #282a30;
  color: #f0f0f0;
  border: 1px solid #282a30;
  margin-bottom: 1rem;
}

.modal-body input:last-child {
  margin-bottom: 0;
}

.modal-content button {
  border-radius: 4px;
  padding: 4px 14px;
}
</style>
