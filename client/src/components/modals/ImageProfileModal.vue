<template>
  <div
    class="modal fade"
    id="ImageProfileModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="ImageProfileModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ImageProfileModalLabel">
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
          <div class="image-management-container">
            <div class="selection-image-container">
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                @change="handleFileUpload"
              />
              <div class="upload-image" @click="triggerFileInputClick">
                <i class="bi bi-upload"></i>
              </div>
              <div class="upload-text">Upload Image</div>
            </div>
            <div class="selection-image-container">
              <div
                class="upload-image bg-light"
                @click="fetchAvatarList"
                data-bs-toggle="modal"
                data-bs-target="#AvatarListModal"
              >
                <i class="bi bi-upload text-dark"></i>
              </div>
              <div class="upload-text">Choose Avatar</div>
            </div>
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
  <!-- Second Modal -->

  <div
    class="modal avatar-list fade"
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
          <div class="grid-container">
            <div class="avatar-image">
              <img :src="imageUrl" alt="" />
            </div>
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
import AvatarListModal from "@/components/modals/AvatarListModal.vue";
import axios from "axios";
import toastr from "toastr";
import { Buffer } from "buffer";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const fileInput = ref(null);
const base64Image = ref(null);
const avatarList = reactive([]);
const base64String = ref(null);
const imageUrl = ref(null);

const handleFileUpload = () => {
  const file = fileInput.value.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    base64Image.value = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

const saveImage = async () => {
  try {
    const response = await axios.put(
      `${userStore.API_URL}/users/update/${userStore.user._id}`,
      { image: base64Image.value }
    );
  } catch (error) {
    console.log(error);
  }
};

const triggerFileInputClick = () => {
  fileInput.value.click();
};

const fetchAvatarList = async () => {
  try {
    const response = await axios.get(`${userStore.API_URL}/images`);
    avatarList.splice(0, avatarList.length, ...response.data);
    base64String.value = Buffer.from(
      avatarList[0].data.data,
      "binary"
    ).toString("base64");

    imageUrl.value = `data:image/png;base64,${base64String.value}`;

    // console.log("avartarList", avatarList);
    // console.log("base64String", base64String.value);
  } catch (error) {
    console.log(error);
  }
};
</script>
<style>
.image-management-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.selection-image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 45%;
  height: 200px;
  background-color: #282a30;
  border-radius: 6px;
}
.upload-image {
  display: flex;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #1b67d3;
  cursor: pointer;
}
.upload-image i {
  margin: auto;
  font-size: 2rem;
}
.upload-text {
  font-weight: 600;
  color: HSL(200, 4%, 55%);
  cursor: pointer;
}
.upload-text:hover {
  color: #f0f0f0;
}
/* avatar list */
.avatar-list .modal-dialog {
  max-width: 625px;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  gap: 10px;
}
.avatar-image {
  /* background-image: url("@/assets/nftIcon.svg");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 3rem; */
  cursor: pointer;
}
</style>
