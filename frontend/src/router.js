import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

import DebugPage from "./views/DebugPage.vue";

const routes = [
    {
        path: "/",
        name: "Debug",
        component: DebugPage,
    },
    /*{
        path: "/ctfs",
        name: "CTFs",
        component: () => import("./views/CTFsPage.vue"),
    }*/
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

router.afterEach((to, from) => {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
});

export default router;
