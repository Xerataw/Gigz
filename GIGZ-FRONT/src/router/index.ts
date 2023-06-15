import BasicPage from "@/components/BasicPage/BasicPage.vue";
import FavoritesVue from "@/views/Favorites/Favorites.vue";
import SearchVue from "@/views/Search/Search.vue";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: BasicPage,
    children: [
      {
        path: "auth",
        children: [
          {
            path: "search",
            component: SearchVue,
          },
          {
            path: "favorites",
            component: FavoritesVue,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    redirect: "/auth/search",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/auth/search",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
