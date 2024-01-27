import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style.css";
import "vue-emoji-mart/css/emoji-mart.css";
import "toastr/build/toastr.css";

const app = createApp(App);
app.use(createPinia());

// Create a global socket instance
// app.config.globalProperties.$socket = io("http://localhost:3000"); // Replace with your server URL

app.use(router).mount("#app");
