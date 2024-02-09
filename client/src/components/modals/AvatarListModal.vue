<template>
  <div
    class="modal fade"
    id="AvatarListModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="AvatarListModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="AvatarListModalLabel">
            Select an Image
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style="padding: 1rem">
          <div class="choose-avatar-container row">
            <div>Text</div>
            <div class="col-md-3 avatar-image"></div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="saveImage">
            Save Image
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import toastr from "toastr";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>
<style>
.avatar-image {
  background-image: url("@/assets/nftIcon.svg");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 3rem;
  cursor: pointer;
}
</style>
