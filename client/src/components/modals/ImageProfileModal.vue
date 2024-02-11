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
            <div
              v-for="(imageUrl, index) in imageUrlList"
              :key="index"
              class="avatar-image"
              :class="{ 'avatar-image-active': clickedAvatar == index }"
              @click="clickedAvatar = index"
            >
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
          <button type="button" class="btn btn-primary" @click="updateImage">
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
import { Buffer } from "buffer";
import { reactive, ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const fileInput = ref(null);
const base64Image = ref(null);
const imageUrlList = reactive([]);
const clickedAvatar = ref(null);

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

const updateImage = async () => {
  try {
    const response = await axios.put(
      `${userStore.API_URL}/users/update/${userStore.user._id}`,
      { image: userStore.avatarList[clickedAvatar.value]._id }
    );

    // update user image id in local storage
    let jwt = JSON.parse(userStore.jwt);
    jwt.data.user = {
      ...jwt.data.user,
      image: userStore.avatarList[clickedAvatar.value]._id,
    };
    localStorage.setItem("jwt_info", JSON.stringify(jwt));

    // update image before refresh
    userStore.profileImageUrl = imageUrlList[clickedAvatar.value];
  } catch (error) {
    console.log(error);
  }
};

const triggerFileInputClick = () => {
  fileInput.value.click();
};

const fetchAvatarList = async () => {
  try {
    for (var i = 0; i < userStore.avatarList.length; i++) {
      const base64String = Buffer.from(
        userStore.avatarList[i].data.data,
        "binary"
      ).toString("base64");

      const imageUrl = `data:image/jpg;base64,${base64String}`;
      imageUrlList.push(imageUrl);
    }
  } catch (error) {
    console.log(error);
  }
};

// const saveImage = async () => {
//   console.log("clickedAvatar", clickedAvatar.value);
// };

onMounted(() => {
  fetchAvatarList();
});
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
  grid-template-columns: auto auto auto auto;
  gap: 10px;
}
.avatar-image {
  cursor: pointer;
}

/* .avatar-image:hover {
  border: 2px solid #f0f0f0;
} */
.avatar-image-active {
  border: 2px solid #f0f0f0;
}
</style>
