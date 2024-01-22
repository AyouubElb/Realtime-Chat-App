<template lang="">
  <div class="chat-box">
    <div class="chat-header">
      <strong>{{ contact.name }}</strong>
    </div>
    <div class="messages py-4">
      <div
        class="message flex-grow-0 mb-2"
        :class="{
          'self ms-auto': message.senderId == userStore.user._id,
          '': message.senderId != userStore.user._id,
        }"
        v-for="(message, index) in messages"
        :key="index"
      >
        <p style="margin-bottom: 0.2rem">
          {{ message.text }}
        </p>
        <p style="margin-bottom: 0.2rem" class="message-footer">
          {{ formatTimestamp(message.createdAt) }}
        </p>
      </div>
    </div>
    <div class="chat-input flex-grow-0">
      <input
        type="text"
        class="input px-3 py-1 mx-2"
        placeholder="Type a message"
        v-model="newMessage"
        @keyup.enter="sendMessageHandler()"
      />
      <button class="btn send-btn" @click="sendMessageHandler()">
        <i class="bi bi-send-fill button-icon"></i>
      </button>
    </div>
  </div>
</template>
<script setup>
import { API_URL } from "../../config";
import { defineProps, ref, reactive, watchEffect } from "vue";
import { useUserStore } from "../../stores/user.js";
import moment from "moment/moment";

const userStore = useUserStore();
const contact = reactive({});
const messages = reactive([]);
const messageInfo = reactive({});
const newMessage = ref("");

const props = defineProps({
  clickedChat: {
    type: Object,
    required: true,
  },
});
console.log("clickedChat", props.clickedChat);

watchEffect(() => {
  if (props.clickedChat.members) {
    const id = props.clickedChat.members.find(
      (id) => id !== userStore.user._id
    );
    console.log("ID", id);

    userStore.fetchUserById(id).then((res) => {
      contact.name = res.name;
    });
    userStore.fetchChatMessages(props.clickedChat.id).then((res) => {
      messages.splice(0, messages.length, ...res); // Update messages with the fetched messages
      console.log("MESSAGES", messages);
    });
  }
});

const formatTimestamp = (timestamp) => {
  // console.log(timestamp);
  return moment(timestamp).format("YYYY-MM-DD HH:mm");
};

const sendMessageHandler = () => {
  (messageInfo.chatId = props.clickedChat.id),
    (messageInfo.senderId = userStore.user._id);
  messageInfo.text = newMessage.value;
  userStore.sendMessage(messageInfo);
};
</script>

<script>
// import { API_URL } from "../../config";
// import moment from "moment/moment";
// import InputEmoji from "react-input-emoji";

// import { io } from "socket.io-client";

// export default {
//   components: {},
//   props: ["clickedChat"],
//   data() {
//     return {
//       messages: [],
//       recipientUser: {},
//       sendingMessage: "",
//       bodyInfo: {},
//       user: {},
//     };
//   },
//   computed: {
//     newChat() {
//       return this.clickedChat;
//     },
//   },
//   watch: {
//     newChat() {
//       console.log("clicked Chat", this.newChat);
//       this.getChatMessages();
//       this.getRecipientUser();
//     },
//   },

//   methods: {
//     getChatMessages() {
//       let id = this.clickedChat._id;

//       fetch(`${API_URL}/messages/${id}`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${this.$token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           this.messages = res.messages;
//         })
//         .catch((error) => console.log(error));
//     },
//     getRecipientUser() {
//       let id = this.clickedChat.members.filter((id) => id != this.user._id);

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
//     formatTimestamp(timestamp) {
//       // Format the timestamp using moment (adjust the format as needed)
//       return moment(timestamp).format("YYYY-MM-DD HH:mm");
//     },
//     sendMessage() {
//       this.bodyInfo = {
//         chatId: this.clickedChat._id,
//         senderId: this.user._id,
//         text: this.sendingMessage,
//       };

//       fetch(`${API_URL}/messages/${this.user._id}`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${this.$token}`,
//         },
//         body: JSON.stringify(this.bodyInfo),
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           if (res.error) {
//             console.log(res.error);
//           }
//           this.messages.push(this.bodyInfo);
//           this.sendingMessage = "";
//           // this.displayMessage();
//           this.$socket.emit("sendMessage", this.bodyInfo);
//         })
//         .catch((error) => console.log(error));
//     },
//   },
//   mounted() {
//     this.user = this.$user;
//     console.log("clickedCHat", this.clickedChat);

//     // Set up a listener for the "receiveMessage" event
//     this.$socket.on("receiveMessage", (data) => {
//       // Handle the received message here
//       console.log("Received a new message:", data);

//       // You can update your messages array or perform any other actions here
//       this.messages.push(data);
//     });
//   },
// };
</script>

<style lang=""></style>
