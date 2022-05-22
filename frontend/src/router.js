import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

import DebugPage from "./views/DebugPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: DebugPage,
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("./views/SettingsPage.vue"),
    },
];

const router = createRouter({
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    nextTick(() => {
        document.title = to.name + " - Adelaide ID" || "Adelaide ID";
    });

    next();
});

export default router;
