import { createRouter, createWebHistory } from "vue-router";
import Chat from "../views/Chat.vue";
import LoginSignup from "../views/Login-signup.vue";

import { isAuthenticated } from "../isAuth";
// import { hasOwnMetadata } from "core-js/fn/reflect";

const routes = [
  {
    path: "/",
    name: "Chat",
    component: Chat,
    beforeEnter: (to, from, next) => {
      // Check if user is authenticated
      if (isAuthenticated()) {
        next(); // User is authenticated, proceed to the route
      } else {
        next("/login"); // Redirect to Signin if not authenticated
      }
    },
  },
  {
    path: "/login-signup",
    name: "LoginSignup",
    component: LoginSignup,
    beforeEnter: (to, from, next) => {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        next(); // User is authenticated, proceed to the route
      } else {
        next("/"); // Redirect to Signin if not authenticated
      }
    },
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
