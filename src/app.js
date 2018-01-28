import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import Index from "./views/index.vue";
import Backoffice from "./views/backoffice.vue";

Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
    { path: "/", component: Index },
    { path: "/backoffice", component: Backoffice }
];

const router = new VueRouter({
    mode: "history",
    routes
});
const app = new Vue({
    router
}).$mount("#app");