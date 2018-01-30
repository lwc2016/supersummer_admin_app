import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Backoffice from "../views/backoffice.vue";
import CategoryList from "../views/category_list.vue";
import CategorySave from "../views/category_save.vue";

const routes = [
    { path: "/", component: Index },
    { path: "/backoffice", component: Backoffice,
      children:[
      	{path: "/backoffice/category/add", component: CategorySave},
      	{path: "/backoffice/category/edit/:id", component: CategorySave},
      	{path: "/backoffice/category/:subject", component: CategoryList, props: true},
      ]
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;