import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      API_URL: "http://localhost:8000/api",
      jwt: localStorage.getItem("jwt_info")
        ? localStorage.getItem("jwt_info")
        : null,
    };
  },
  getters: {
    isAuthenticated() {
      if (this.jwt) {
        return JSON.parse(this.jwt);
      }

      return false;
    },
  },
  actions: {},
});
