import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const Register = () => import("./pages/Register.vue");
const Draw = () => import("./pages/Draw.vue");
const Notfound = () => import("./pages/404.vue");

const routes = [
  { path: "/", name: "Register", component: Register },
  { path: "/draw", name: "Draw", component: Draw },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: Notfound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(router).use(pinia).mount("#app");
