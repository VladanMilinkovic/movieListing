import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/styles/_main.scss";

const app = createApp(App);

app
    .use(createPinia())
    .use(router)

app.config.globalProperties.$axios = axios;

app.mount("#app");
