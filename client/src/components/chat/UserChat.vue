<template>
  <div class="message-box-header">
    <p>Chats</p>
  </div>
  <div class="contact-search">
    <input type="text" placeholder="Find or start a conversation" />
  </div>
  <div
    class="contact-card"
    v-for="(chat, index) in chats"
    :key="index"
    @click="openChat(chat)"
  >
    <div class="contact-card-icon me-2">
      <img :src="require('../../assets/nftIcon.svg')" alt="" />
    </div>
    <div class="text-content">
      <div class="name" v-if="chat">{{ chat.name }}</div>
      <div class="name" v-else>
        <!-- Placeholder or loading state while user information is being fetched -->
        Loading user information...
      </div>
      <div class="text">Text Message</div>
    </div>
    <div class="notification-container">
      <div class="date">12/12/2022</div>
      <div class="this-user-notifications">2</div>
    </div>
    <!-- <span
          :class="{
            'user-online': userOnline,
          }"
        ></span> -->
  </div>
</template>
<script setup>
import { API_URL } from "../../config";
import { defineProps, ref, reactive, onMounted, watchEffect } from "vue";
import { useUserStore } from "../../stores/user.js";
import axios from "axios";
const userStore = useUserStore();
const chats = ref(null);
// const props = defineProps({
//   chat: {
//     type: Object,
//     required: true,
//   },
//   onlineUsers: Object,
// });
const clickedChat = reactive({});
const userInfo = ref(null);

const openChat = (chat) => {
  clickedChat.id = chat._id;
  clickedChat.members = chat.members;
  userStore.clickedChat = clickedChat;
  console.log("clickedChat", userStore.clickedChat);
};

onMounted(async () => {
  const data = await userStore.fetchChats();
  chats.value = data;
  console.log("Test", data);
});

watchEffect(() => {
  const id = chat.members.find((id) => id !== userStore.user._id);
  userStore.fetchUserById(id).then((res) => {
    userInfo.value = res;
  });
});
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
  padding-inline: 1rem;
}
/* User Card */
.contact-card {
  border-bottom: 1px solid rgb(100, 100, 100);
  width: 100%;
  height: 5rem;
  display: flex;
  margin-inline: auto;
  padding: 0.75rem 1rem;
}

.contact-card-icon img {
  width: 3rem;
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
  width: 12px;
  border-radius: 50%;
  background: rgb(0, 219, 0);
  position: absolute;
  top: -3px;
  right: -3px;
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
</style>
