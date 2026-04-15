import { createRouter, createWebHistory } from "vue-router";
import Home from "../routes/Home.vue";
import Add from "../routes/Add.vue";
import Edit from "../routes/Edit.vue";
import Contact from "../routes/Contact.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/add", name: "Add", component: Add },
    { path: "/edit/:id", name: "Edit", component: Edit },
    { path: "/contact/:id", name: "Contact", component: Contact },
  ],
});

export default router;
