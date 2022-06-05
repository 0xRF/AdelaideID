import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

import DebugPage from "./views/DebugPage.vue";
import CoursePage from "./views/CoursePage.vue";
import ClassPage from "./views/ClassPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: CoursePage,
    },
    {
        path: "/class/:id",
        name: "Classes",
        component: ClassPage,
    },
    {
        path: "/debug",
        name: "Debug",
        component: DebugPage,
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("./views/SettingsPage.vue"),
    },
    {
        path: "/scan",
        name: "Scanner",
        meta: {
            fullscreen: true,
            invert: true,
        },
        component: () => import("./views/BarcodeScanner.vue"),
    },
    {
        path: "/add",
        name: "Manual Add",
        component: () => import("./views/AddPage.vue"),
    },
    {
        path: "/register",
        name: "Registration",
        component: () => import("./views/RegisterPage.vue"),
    },
    {
        path: "/login",
        name: "Log in",
        component: () => import("./views/LoginPage.vue"),
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
