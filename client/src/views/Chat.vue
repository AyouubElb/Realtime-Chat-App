<template lang="">
  <div class="chat-section">
    <div class="row">
      <div class="message-box col-md-3 flex-grow-0 pt-4">
        <UserChat />
        <!-- <UserChat :chat="chat" :onlineUsers="onlineUsers" /> -->
      </div>
      <div class="chat-box col-md-9">
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
// const chats = ref(null);
// const clickedChat = reactive({});

// const openChat = (chat) => {
//   clickedChat.id = chat._id;
//   clickedChat.members = chat.members;
// };

// onMounted(async () => {
//   const data = await userStore.fetchChats();
//   chats.value = data;
//   console.log("Test", data);
// });
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
  height: 100vh;
  width: 100%;
}
.row {
  padding: 0;
}
.row > * {
  padding: 0 !important;
}
.message-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #3a4042;
}

.message-box :hover {
  background-color: #4d5355;
}

/* Chat Box */
.chat-box {
  overflow-y: auto;
  background: #222831;
  border-radius: 10px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
