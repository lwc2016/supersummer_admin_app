import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Backoffice from "../views/backoffice.vue";
import CategoryList from "../views/category_list.vue";
import CategorySave from "../views/category_save.vue";
import ExamList from "../views/exam_list.vue";

const routes = [
    { path: "/", component: Index },
    { path: "/backoffice", component: Backoffice,
      children:[
      	{path: "/backoffice/category/add", component: CategorySave},
      	{path: "/backoffice/category/edit/:id", component: CategorySave, props: true},
      	{path: "/backoffice/category/:subject", component: CategoryList, props: true},
        {path: "/backoffice/exam/list", component: ExamList}
      ]
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;