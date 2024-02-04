<template>
  <div class="icon me-2">
    <img :src="require('../../assets/nftIcon.svg')" alt="" />
  </div>
  <div class="text-content">
    <div class="name" v-if="chat.friendInfo">
      {{ chat.friendInfo.name }}
    </div>
    <div class="text" v-If="getLastUnread(chat.notifications)?.text">
      {{ getLastUnread(chat.notifications)?.text }}
    </div>
  </div>
  <div class="notification-container">
    <div class="date" v-if="getLastUnread(chat.notifications)?.date">
      {{ getLastUnread(chat.notifications).date }}
    </div>
    <div
      class="this-user-notifications"
      v-if="countUnread(chat.notifications) > 0"
    >
      {{ countUnread(chat.notifications) }}
    </div>
  </div>
  <span
    :class="{
      'contact-online': chat.friendInfo && isFriendOnline(chat.friendInfo._id),
    }"
  ></span>
</template>
<script setup>
import { reactive, watchEffect, watch, onMounted } from "vue";
import { useUserStore } from "../../stores/user.js";
import { io } from "socket.io-client";
import moment from "moment/moment";

const props = defineProps({
  chat: Object,
});
const chat = props.chat;
const userStore = useUserStore();
const socket = userStore.socket;
const onlineUsersList = reactive([]);
const notifications = reactive([]);
const clickedChat = reactive({});
const latestUnreadNotif = reactive({});

console.log("chat test", chat);

const isFriendOnline = (friendId) => {
  if (onlineUsersList) {
    const isOnline = onlineUsersList.some((onlineUser) => {
      return onlineUser.user.userId === friendId;
    });
    return isOnline;
  }
  return false;
};

const unreadNotifications = (notifications) => {
  return notifications.filter((value) => value.isRead === false);
};

// count chat unread notifications
const countUnread = (data) => {
  let length = 0;
  data.forEach((item) => {
    if (!item.isRead) {
      length++;
    }
  });
  return length;
};

// update last unread notification
const getLastUnread = (data) => {
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      if (!data[i].isRead) {
        return {
          text: data[i].text,
          date: formatTimestamp(data[i].date),
        };
      }
    }
  }
};

const formatTimestamp = (timestamp) => {
  return moment(timestamp).format("HH:mm");
};

onMounted(async () => {
  // Fetch user information for each chat member
  const memberId = chat.members.find((id) => id !== userStore.user._id);
  const friendInfo = await userStore.fetchUserById(memberId);
  chat.friendInfo = friendInfo;
});

const deleteChatNotications = () => {
  chat.notifications.forEach((value) => {
    value.isRead = true;
  });
};

watchEffect(() => {
  // listen to getOnlineUsers event from socket
  if (socket != null) {
    socket.on("getOnlineUsers", (onlineUsers) => {
      onlineUsers.forEach((user) => {
        onlineUsersList.push({ user });
      });
    });
  }

  // Add notifications to each chat
  const updateChatNotifications = () => {
    const notificationsData = unreadNotifications(userStore.notifications);
    notifications.splice(0, notifications.length, ...notificationsData);
    chat.notifications = [];
    notifications.forEach((notification) => {
      if (chat._id === notification.chatId) {
        chat.notifications.push(notification);
      }
    });
  };

  updateChatNotifications();

  //remove notifications for open chat
  if (userStore.clickedChat.id === chat._id) {
    deleteChatNotications();
  }
  // update latest unread notification
  // const latestUnread = getLastUnread(chat.notifications);
  // latestUnreadNotif.text = latestUnread ? latestUnread.text : null;
  // latestUnreadNotif.date = latestUnread ? latestUnread.date : null;
});
</script>
<style>
/* .icon img {
  width: 2.5rem;
  border-radius: 50%;
}

.contact-card .text-content {
  width: min(70%, 170px);
}

.contact-card .notification-container {
  margin-left: auto;
}

.contact-card .name {
  font-weight: 700;
}

.contact-card .text,
.contact-card .date {
  font-size: 14px;
  color: rgb(180, 180, 180);
}

.contact-card .date {
  margin-bottom: 0.5rem;
}

.contact-online {
  display: inline-block;
  height: 12px;
  min-width: 12px;
  border-radius: 50%;
  background: rgb(0, 219, 0);
  z-index: 2;
} */
</style>
