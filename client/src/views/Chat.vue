<template lang="">
  <div class="chat-section">
    <!-- <div class="row"> -->
    <div class="message-box pt-4">
      <UserChat />
      <!-- <UserChat :chat="chat" :onlineUsers="onlineUsers" /> -->
    </div>
    <div class="chat-box">
      <chatBox :clickedChat="clickedChat" />
      <!-- <chatBox :clickedChat="clickedChat" :socket="socket" /> -->
    </div>
    <!-- </div> -->
  </div>
</template>
<script setup>
import UserChat from "../components/chat/UserChat";
import chatBox from "../components/chat/chatBox";
import { onMounted, ref, reactive } from "vue";
import { useUserStore } from "../stores/user";
import { io } from "socket.io-client";
const userStore = useUserStore();
const socket = userStore.socket;

onMounted(() => {
  if (socket != null) {
    // console.log("socket", socket);
    socket.emit("addNewUser", userStore.user._id);
  }
});
</script>

<!--
<script>
import { API_URL } from "../config";
import UserChat from "../components/chat/UserChat";
import chatBox from "../components/chat/chatBox";

import { io } from "socket.io-client";

export default {
  components: {
    UserChat,
    chatBox,
  },
  data() {
    return {
      chats: [],
      clickedChat: {},
      onlineUsers: {},
    };
  },
  methods: {
    // getChats() {
    //   fetch(`${API_URL}/chats/${this.$user._id}`, {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       this.chats = res.chats;
    //     })
    //     .catch((error) => console.log(error));
    // },
    chatClicked(chat) {
      this.clickedChat = chat;
    },
  },
  mounted() {
    //   this.getChats();
    //   if (this.$socket != null) {
    //     this.$socket.emit("addNewUser", this.$user._id);
    //   }
    //   this.$socket.on("getOnlineUsers", (onlineUsers) => {
    //     this.onlineUsers = onlineUsers;
    //     console.log("onlineUsers", this.onlineUsers);
    //   });
  },
};
</scrip>
-->
<style>
.chat-section {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.message-box {
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100vh;
  background-color: #3a4042;
}

/* Chat Box */
.chat-box {
  background: #222831;
  border-radius: 10px;
  width: 75%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
