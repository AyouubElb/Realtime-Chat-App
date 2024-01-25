<template lang="">
  <div class="chat-header">
    <div class="chat-header-icon">
      <img :src="require('../../assets/nftIcon.svg')" alt="" />
    </div>
    <strong>{{ contact.name }}</strong>
  </div>
  <div class="messages" ref="messagesContainer">
    <div
      class="message mb-2"
      :class="{
        'self ms-auto': message.senderId == userStore.user._id,
        '': message.senderId != userStore.user._id,
      }"
      v-for="(message, index) in messages"
      :key="index"
    >
      <p style="margin-bottom: 0.2rem">{{ message.text }}</p>
      <p style="margin-bottom: 0.2rem" class="message-date">
        {{ formatTimestamp(message.createdAt) }}
      </p>
    </div>
  </div>
  <div class="chat-input">
    <input
      type="text"
      class="input px-3 py-2 mx-2"
      placeholder="Type a message"
      v-model="newMessage"
      @keyup.enter="sendMessageHandler()"
    />
    <!-- <button class="btn send-btn" @click="sendMessageHandler()">
      <i class="bi bi-send-fill button-icon"></i>
    </button> -->
  </div>
</template>
<script setup>
import { API_URL } from "../../config";
import {
  defineProps,
  onMounted,
  onUpdated,
  ref,
  reactive,
  watchEffect,
} from "vue";
import { useUserStore } from "../../stores/user.js";
import moment from "moment/moment";

const userStore = useUserStore();
const contact = reactive({});
const messages = reactive([]);
const messageInfo = reactive({});
const newMessage = ref("");
const messagesContainer = ref(null);

// Scroll to the bottom of the messages container
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});

onUpdated(() => {
  scrollToBottom();
});
/**************/

watchEffect(() => {
  if (userStore.clickedChat?.members) {
    const id = userStore.clickedChat.members.find(
      (id) => id !== userStore.user._id
    );
    console.log("ID", id);

    userStore.fetchUserById(id).then((res) => {
      contact.name = res.name;
    });
    userStore.fetchChatMessages(userStore.clickedChat.id).then((res) => {
      messages.splice(0, messages.length, ...res); // Update messages with the fetched messages
      console.log("MESSAGES", messages);
    });
  }
});

const formatTimestamp = (timestamp) => {
  // return moment(timestamp).format("YYYY-MM-DD HH:mm");
  return moment(timestamp).format("HH:mm");
};

const sendMessageHandler = () => {
  (messageInfo.chatId = userStore.clickedChat.id),
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

<style>
/* Chat Header */
.chat-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #313538;
}

.chat-header-icon img {
  width: 2rem;
  border-radius: 50%;
}
/* Messages */
.messages {
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  margin-top: auto;
  padding: 0 2rem;
}

.message {
  display: flex;
  color: white;
  background: #282828;
  padding: 0.25rem;
  border-radius: 5px;
  word-wrap: break-word; /* Allow long words to wrap to the next line */
  white-space: pre-line; /* Preserve line breaks in the message text */
  overflow-wrap: break-word; /* Ensure that long words wrap within the container */
  max-width: 30%; /* Adjust the maximum width as needed */
}

.message.self {
  background: #0092ca;
}

.message-date {
  font-size: 12px;
  margin-left: auto;
  font-weight: 400;
}
.chat-input {
  width: 100%;
  /* background: rgb(30, 30, 30); */
  padding: 1rem;
}

.input {
  width: 95%;
  border-radius: 8px;
}
/* .send-btn {
  border: none;
  background: rgba(72, 112, 223, 1);
  color: whitesmoke;
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.button-icon {
  display: flex;
  justify-content: center;
} */
</style>
