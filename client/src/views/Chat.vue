<template lang="">
  <div class="chat-section">
    <div class="message-box pt-4">
      <ChatHub />
    </div>
    <div class="chat-box">
      <chatBox :clickedChat="clickedChat" />
    </div>
  </div>
</template>
<script setup>
import ChatHub from "../components/chat/ChatHub";
import chatBox from "../components/chat/chatBox";
import { onMounted, watchEffect, reactive } from "vue";
import { useUserStore } from "../stores/user";
import { io } from "socket.io-client";
const userStore = useUserStore();
const socket = userStore.socket;
const user = reactive({});

onMounted(() => {
  if (socket != null) {
    // console.log("socket", socket);
    socket.emit("addNewUser", userStore.user._id);
  }
});
</script>

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
  min-width: 250px;
  height: 100vh;
  background-color: #3a4042;
}

/* Chat Box */
.chat-box {
  background: #222831;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
