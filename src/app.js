import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import router from "./modules/router.js";

Vue.use(ElementUI);
Vue.use(VueRouter);

const app = new Vue({
    router
}).$mount("#app");