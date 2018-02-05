import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Backoffice from "../views/backoffice.vue";
import CategoryList from "../views/category_list.vue";
import CategorySave from "../views/category_save.vue";
import PaperList from "../views/paper_list.vue";
import PaperSave from "../views/paper_save.vue";
import AnswerList from "../views/answer_list.vue";

const routes = [
    { path: "/", component: Index },
    { path: "/backoffice", component: Backoffice,
      children:[
      	{path: "/backoffice/category/add", component: CategorySave},
      	{path: "/backoffice/category/edit/:id", component: CategorySave, props: true},
      	{path: "/backoffice/category/:subject", component: CategoryList, props: true},
        {path: "/backoffice/paper/list", component: PaperList},
        {path: "/backoffice/paper/add", component: PaperSave},
        {path: "/backoffice/paper/edit/:id", component: PaperSave, props: true},
        {path: "/backoffice/answer/list", component: AnswerList}
      ]
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;