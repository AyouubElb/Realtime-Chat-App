import { createRouter, createWebHistory } from "vue-router";
import Chat from "../views/Chat.vue";

import { isAuthenticated } from "../isAuth";
// import { hasOwnMetadata } from "core-js/fn/reflect";

const routes = [
  {
    path: "/",
    name: "Chat",
    component: Chat,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/login-signup");
      }
    },
  },
  {
    path: "/login-signup",
    name: "LoginSignup",
    component: () =>
      import(/* webpackChunkName: "LoginSignup"*/ "@/views/Login-signup.vue"),
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/profile-settings",
    name: "profile-settings",
    component: () =>
      import(
        /* webpackChunkName: "ProfileSettings"*/ "@/views/ProfileSettings.vue"
      ),
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: Register,
  //   beforeEnter: (to, from, next) => {
  //     // Check if user is authenticated
  //     if (!isAuthenticated()) {
  //       next(); // User is authenticated, proceed to the route
  //     } else {
  //       next("/"); // Redirect to Signin if not authenticated
  //     }
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
