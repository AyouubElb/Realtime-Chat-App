<template>
  <div class="message-box-header">
    <p>Chats</p>
  </div>
  <div class="contact-search">
    <input type="text" placeholder="Find or start a conversation" />
  </div>
  <div class="add-friend">
    <p>Personal Messages</p>
    <i class="bi bi-plus-square"></i>
  </div>
  <div
    class="contact-card"
    v-for="(chat, index) in chats"
    :key="index"
    @click="openChat(chat)"
  >
    <div class="icon me-2">
      <img :src="require('../../assets/nftIcon.svg')" alt="" />
    </div>
    <div class="text-content">
      <div class="name" v-if="chat.friendInfo">{{ chat.friendInfo.name }}</div>
      <div class="text">Text Message</div>
    </div>
    <div class="notification-container">
      <div class="date">12/12/2022</div>
      <div class="this-user-notifications">2</div>
    </div>
    <span
      :class="{
        'contact-online':
          chat.friendInfo && isFriendOnline(chat.friendInfo._id),
      }"
    ></span>
  </div>
  <div class="user-panel">
    <div class="icon me-2">
      <img :src="require('../../assets/nftIcon.svg')" alt="" />
    </div>
    <div class="user_name">{{ userStore.user.name }}</div>
    <router-link to="/profile-settings" class="setting-btn">
      <i class="bi bi-gear-fill"></i>
    </router-link>
  </div>
</template>
<script setup>
import { API_URL } from "../../config";
import {
  defineProps,
  ref,
  reactive,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { useUserStore } from "../../stores/user.js";
import { io } from "socket.io-client";
import axios from "axios";
const userStore = useUserStore();
const socket = userStore.socket;

const chats = reactive([]);
const clickedChat = reactive({});
const userInfo = ref(null);
const onlineUsersList = reactive([]);

const openChat = (chat) => {
  clickedChat.id = chat._id;
  clickedChat.members = chat.members;
  userStore.clickedChat = clickedChat;
  console.log("clickedChat", userStore.clickedChat);
};

onMounted(async () => {
  console.log("user", userStore.user);
  await userStore.fetchChats().then((res) => {
    chats.splice(0, chats.length, ...res);
  });

  userStore.sendNewUser();

  // Fetch user information for each chat member
  for (let i = 0; i < chats.length; i++) {
    const chat = chats[i];
    const memberId = chat.members.find((id) => id !== userStore.user._id);
    const friendInfo = await userStore.fetchUserById(memberId);
    chats[i].friendInfo = friendInfo;
  }
});

watchEffect(() => {
  // get online users
  if (socket != null) {
    socket.on("getOnlineUsers", (onlineUsers) => {
      onlineUsers.forEach((user) => {
        onlineUsersList.push({ user });
      });
    });
  }
});

const isFriendOnline = (friendId) => {
  if (onlineUsersList) {
    const isOnline = onlineUsersList.some((onlineUser) => {
      return onlineUser.user.userId === friendId;
    });
    return isOnline;
  }
  return false;
};
</script>

<script>
// import { API_URL } from "../../config";

// export default {
//   props: ["chat", "onlineUsers"],
//   data() {
//     return {
//       recipientUser: {},
//     };
//   },
//   computed: {
//     userOnline() {
//       if (Array.isArray(this.onlineUsers)) {
//         return this.onlineUsers.some(
//           (user) => user.userId === this.recipientUser._id
//         );
//       }
//       return false; // Return false if onlineUsers is not an array
//     },
//   },
//   methods: {
//     getRecipientUser() {
//       // other user id
//       const id = this.chat.members.filter((id) => id != this.$user._id);
//       fetch(`${API_URL}/users/find/${id}`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${this.$token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           this.recipientUser = res.user;
//         })
//         .catch((error) => console.log(error));
//     },
//   },
//   mounted() {
//     console.log("chatBox", this.chat);
//     this.getRecipientUser();
//   },
// };
//
</script>
<style>
.message-box-header {
  padding-inline: 1rem;
}
.message-box-header p {
  font-size: 1.5rem;
  color: #d3d3d3;
}

.contact-search {
  padding-inline: 1rem;
  margin-bottom: 2rem;
}
.contact-search input {
  width: 100%;
  background-color: #1d1f25;
  border: #d3d3d3 1px solid;
  border-radius: 5px;
  color: #d3d3d3;
  padding: 0.25rem 1rem;
}
.add-friend {
  display: flex;
  color: #d3d3d3;
  padding-inline: 1rem;
}
.add-friend p {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}
.add-friend i {
  margin-left: auto;
  cursor: pointer;
}
/* User Card */
.contact-card {
  border-bottom: 1px solid rgb(100, 100, 100);
  width: 100%;
  height: 5rem;
  display: flex;
  margin-inline: auto;
  padding: 0.75rem 1rem;
  cursor: pointer;
}

.contact-card:hover {
  background-color: #4d5355;
}

.icon img {
  width: 2.5rem;
  border-radius: 50%;
}

.contact-card .text-content {
  width: min(70%, 170px);
}

.contact-card .notification-container {
  margin-left: auto;
}

.contact-card .name {
  font-weight: 700;
}

.contact-card .text,
.contact-card .date {
  font-size: 14px;
  color: rgb(180, 180, 180);
}

.contact-card .date {
  margin-bottom: 0.5rem;
}

.contact-online {
  display: inline-block;
  height: 12px;
  min-width: 12px;
  border-radius: 50%;
  background: rgb(0, 219, 0);
  z-index: 2;
}

.this-user-notifications {
  display: flex;
  background: #0092ca;
  height: 20px;
  width: 20px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.user-panel {
  display: flex;
  background-color: #1d1f25;
  margin-top: auto;
  padding: 0.5rem 1rem;
}
.user-panel .user_name {
  margin-top: auto;
  margin-bottom: auto;
}
.setting-btn {
  color: #d3d3d3;
  margin: auto 0 auto auto;
  padding: 6px;
  cursor: pointer;
}
.setting-btn:hover {
  background-color: #2d2f35;
}
</style>
