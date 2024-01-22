<template lang="">
  <div class="container mt-4 px-4">
    <div class="row">
      <div class="col-md-5 message-box flex-grow-0 pe-3 pt-3">
        <div
          v-for="(chat, index) in chats"
          :key="index"
          @click="openChat(chat)"
        >
          <UserChat :chat="chat" />
          <!-- <UserChat :chat="chat" :onlineUsers="onlineUsers" /> -->
        </div>
      </div>
      <div class="col-md-6 p-2 ms-auto">
        <chatBox :clickedChat="clickedChat" />
        <!-- <chatBox :clickedChat="clickedChat" :socket="socket" /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import UserChat from "../components/chat/UserChat";
import chatBox from "../components/chat/chatBox";
import { onMounted, ref, reactive } from "vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
const chats = ref(null);
const clickedChat = reactive({});

const openChat = (chat) => {
  clickedChat.id = chat._id;
  clickedChat.members = chat.members;
};

onMounted(async () => {
  const data = await userStore.fetchChats();
  chats.value = data;
  console.log("Test", data);
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
<style lang=""></style>
