// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import { createPinia } from "pinia";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
// import "bootstrap-icons/font/bootstrap-icons.min.css";
// import "./style.css";
// import "vue-emoji-mart/css/emoji-mart.css";
// import "toastr/build/toastr.css";

// const app = createApp(App);
// app.use(createPinia());

// app.use(router).mount("#app");

import { createAuth0 } from "@auth0/auth0-vue";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "vue-emoji-mart/css/emoji-mart.css";
import "toastr/build/toastr.css";

const app = createApp(App);
app.use(createPinia());

app
  .use(router)
  .use(
    createAuth0({
      domain: process.env.VUE_APP_AUTH0_DOMAIN,
      clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: process.env.VUE_APP_AUTH0_CALLBACK_URL,
        audience: process.env.VUE_AUTH0_AUDIENCE,
      },
    })
  )
  .mount("#app");
