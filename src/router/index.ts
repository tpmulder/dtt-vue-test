import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/characters",
    name: "Characters",
    component: () => import("../views/Characters.vue")
  },
  {
    path: "/randomize",
    name: "Random",
    component: () => import("../views/Randomize.vue")
  },
  {
    path: "/character/:id",
    name: "Character",
    component: () => import("../views/Character.vue"),
    props: route => {
      const id = Number.parseInt(route.params.id as string, 10);
      if (Number.isNaN(id)) return 1;

      return { id };
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
