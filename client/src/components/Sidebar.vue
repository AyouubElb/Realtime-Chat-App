<template>
  <div class="sidebar">
    <div class="sidebar-icon">
      <img :src="require('../assets/nftIcon.svg')" alt="" />
    </div>
  </div>
</template>
<script setup></script>
<style>
.sidebar {
  height: 100vh;
  width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  /* background-color: #1e1f22; */
  background-color: #1d1f25;
}

.sidebar-icon img {
  width: 3rem;
  border-radius: 8px;
}
</style>
