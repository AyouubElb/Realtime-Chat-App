import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      API_URL: "http://localhost:8000/api",
      jwt: localStorage.getItem("jwt_info")
        ? localStorage.getItem("jwt_info")
        : null,
      chats: [],
      clickedChat: {},
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
  },
  actions: {
    async fetchChats() {
      try {
        const res = await axios.get(`${this.API_URL}/chats/${this.user._id}`);
        // console.log("chats", res.data.chats);
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
        console.log("messageInfo", messageInfo);
        const res = await axios.post(
          `${this.API_URL}/messages/${messageInfo.senderId}`,
          messageInfo
        );
        console.log("message response", res);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
