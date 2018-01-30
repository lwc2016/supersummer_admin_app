import Index from "../views/index.vue";
import Backoffice from "../views/backoffice.vue";
import VueRouter from "vue-router";
const routes = [
    { path: "/", component: Index },
    { path: "/backoffice", component: Backoffice }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;