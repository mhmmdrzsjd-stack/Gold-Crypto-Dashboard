import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Markets from "../views/Markets.vue";
import Gold from "../views/Gold.vue";
import Crypto from "../views/Crypto.vue";
import Portfolio from "../views/Portfolio.vue";
import Transactions from "../views/Transactions.vue";
import Settings from "../views/Settings.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/markets",
      name: "markets",
      component: Markets,
    },
    {
      path: "/gold",
      name: "gold",
      component: Gold,
    },
    {
      path: "/crypto",
      name: "crypto",
      component: Crypto,
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio,
    },
    {
      path: "/transactions",
      name: "transactions",
      component: Transactions,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});
export default router;