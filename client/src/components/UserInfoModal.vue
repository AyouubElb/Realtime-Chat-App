<template>
  <div
    class="modal fade"
    :id="dynamicModalTarget"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="userInfoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="userInfoModalLabel">
            {{ modalTitle }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="modal-body-title">{{ props.info.title }}</div>
          <input type="text" v-model="props.info.value" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="updateUser()">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { defineProps, computed } from "vue";
import { useUserStore } from "@/stores/user";
const props = defineProps({
  info: Object,
});

const userStore = useUserStore();

const modalTitle = computed(() => {
  return props.info.isEmpty
    ? "Add " + props.info.title
    : "Edit " + props.info.title;
});

const dynamicModalTarget = computed(() => {
  return `userInfoModal${props.info.id}`;
});

const userData = computed(() => {
  const attribut = props.info.title;
  return { [attribut]: props.info.value };
});

const updateUser = async () => {
  const attribut = props.info.title;
  const value = props.info.value;
  try {
    const response = await axios.put(
      `${userStore.API_URL}/users/update/${userStore.user._id}`,
      { [attribut]: value }
    );

    let jwt = JSON.parse(userStore.jwt);
    jwt.data.user = { ...jwt.data.user, [attribut]: value };
    localStorage.setItem("jwt_info", JSON.stringify(jwt));
  } catch (error) {
    console.log(error);
  }
};
</script>
