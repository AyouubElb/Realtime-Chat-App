import { defineStore } from "pinia";
import axios from "axios";
import { io } from "socket.io-client";
import { Buffer } from "buffer";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      API_URL: "http://localhost:8000/api",
      jwt: localStorage.getItem("jwt_info")
        ? localStorage.getItem("jwt_info")
        : null,
      profileImage: null,
      profileImageUrl: "",
      chats: [],
      notifications: [],
      clickedChat: {},
      avatarList: [],
    };
  },
  getters: {
    isAuthenticated() {
      const jwt = localStorage.getItem("jwt_info");
      if (jwt) {
        return JSON.parse(jwt);
      }
      return false;
    },
    user() {
      return JSON.parse(this.jwt).data.user;
    },
    friendId() {
      const id = this.clickedChat.members.find((id) => id !== this.user._id);
      return id;
    },
    socket() {
      return io("http://localhost:3000");
    },
  },
  actions: {
    sendNewUser() {
      if (this.$socket != null) {
        this.$socket.emit("addNewUser", this.$user._id);
      }
    },

    async fetchChats() {
      try {
        const res = await axios.get(`${this.API_URL}/chats/${this.user._id}`);
        this.chats = res.data.chats;
        return res.data.chats;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserById(id) {
      try {
        const res = await axios.get(`${this.API_URL}/users/find/${id}`);
        return res.data.user;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchChatMessages(chatId) {
      try {
        const res = await axios.get(`${this.API_URL}/messages/${chatId}`);
        return res.data.messages;
      } catch (error) {
        console.log(error);
      }
    },
    async sendMessage(messageInfo) {
      try {
        const res = await axios.post(
          `${this.API_URL}/messages/${messageInfo.senderId}`,
          messageInfo
        );
        // console.log("message response", res);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserImage() {
      try {
        const res = await axios.get(
          `${this.API_URL}/images/${this.user.image}`
        );
        this.profileImage = Buffer.from(res.data.data, "binary").toString(
          "base64"
        );
        this.profileImageUrl = `data:image/jpg;base64,${this.profileImage}`;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAvatarImages() {
      try {
        const response = await axios.get(`${this.API_URL}/images`);
        this.avatarList.splice(0, this.avatarList.length, ...response.data);
        console.log("fetchAvatarImages", this.avatarList);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
