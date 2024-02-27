import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView";

import { isAuthenticated } from "../isAuth";
// import { hasOwnMetadata } from "core-js/fn/reflect";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/chat-page",
    name: "ChatPage",
    component: () => import(/* webpackChunkName: "Chat"*/ "@/views/Chat"),
  },
  {
    path: "/login-signup",
    name: "LoginSignup",
    component: () =>
      import(/* webpackChunkName: "LoginSignup"*/ "@/views/Login-signup.vue"),
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
