import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import AppLayout from "@/views/AppLayout.vue";
import Tab4PageVue from "@/components/Tab4Page.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/favorites",
  },
  {
    path: "/",
    component: AppLayout,
    // children: [
    //   {
    //     path: "",
    //     redirect: "/tabs/tab1",
    //   },
    //   {
    //     path: "tab1",
    //     component: () => import("@/views/Tab1Page.vue"),
    //   },
    //   {
    //     path: "tab2",
    //     component: () => import("@/views/Tab2Page.vue"),
    //   },
    //   {
    //     path: "tab3",
    //     component: () => import("@/views/Tab3Page.vue"),
    //   },
    // ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
