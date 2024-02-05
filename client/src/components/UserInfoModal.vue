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
          <h1 class="modal-title fs-5" id="userInfoModalLabel">
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
          <button type="button" class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  info: Object,
});

const modalTitle = computed(() => {
  return props.info.isEmpty
    ? "Add " + props.info.title
    : "Edit " + props.info.title;
});

const dynamicModalTarget = computed(() => {
  return `userInfoModal${props.info.id}`;
});
</script>
<style>
.modal-content {
  color: white;
  background-color: #3a4042;
  border-radius: 6px;
}
.modal-body {
  padding: 2rem;
}
.modal-body-title {
  text-transform: UPPERCASE;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}
.modal-body input {
  width: 100%;
  border-radius: 3px;
  padding: 4px 8px;
  background-color: #282a30;
  color: #f0f0f0;
  border: 1px solid #282a30;
}

.modal-content button {
  border-radius: 4px;
  padding: 4px 14px;
}
</style>
