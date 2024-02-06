<template>
  <div
    class="modal fade"
    id="changePassswordModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="changePassswordModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="changePassswordModalLabel">
            Update Your Password
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="modal-body-title">Current Password</div>
          <input type="password" v-model="inputData.currentPassword" />
          <div class="modal-body-title">New Password</div>
          <input type="password" v-model="inputData.newPassword" />
          <div class="modal-body-title">Confirm New Password</div>
          <input type="password" v-model="inputData.confirmPassword" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const inputData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
</script>
