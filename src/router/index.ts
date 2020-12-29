import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
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
    path: "/feedback",
    name: "Feedback",
    component: () => import("../views/Feedback.vue")
  },
  {
    path: "/character/:id",
    name: "Character",
    component: () => import("../views/Character.vue"),
    props: route => {
      let id = Number.parseInt(route.params.id as string, 10);
      if (Number.isNaN(id)) id = 1;

      return { id };
    }
  },
  {
    path: "/sitemap",
    name: "Sitemap",
    component: () => import("../views/SiteMap.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
