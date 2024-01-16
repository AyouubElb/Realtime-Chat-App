<template lang="">
  <div
    class="hstack gap-3 user-card align-items-center p-2 justify-content-between"
    role="button"
  >
    <div class="d-flex">
      <div class="me-2">
        <img
          :src="require('../../assets/avatar.svg')"
          style="height: 35px"
          alt=""
        />
      </div>
      <div class="text-content">
        <div class="name">{{ recipientUser.name }}</div>
        <div class="text">Text Message</div>
      </div>
      <div class="d-flex flex-column align-items-end">
        <div class="date">12/12/2022</div>
        <div class="this-user-notifications">2</div>
        <span
          :class="{
            'user-online': userOnline,
          }"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import { API_URL } from "../../config";

export default {
  props: ["chat", "onlineUsers"],
  data() {
    return {
      recipientUser: {},
    };
  },
  computed: {
    userOnline() {
      if (Array.isArray(this.onlineUsers)) {
        return this.onlineUsers.some(
          (user) => user.userId === this.recipientUser._id
        );
      }
      return false; // Return false if onlineUsers is not an array
    },
  },
  methods: {
    getRecipientUser() {
      // other user id
      const id = this.chat.members.filter((id) => id != this.$user._id);
      fetch(`${API_URL}/users/find/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.recipientUser = res.user;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getRecipientUser();
  },
};
</script>
<style lang=""></style>
