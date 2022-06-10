import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import store from "./store";

import CoursePage from "./views/CoursePage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: CoursePage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/course/:id",
        name: "Classes",
        component: () => import("./views/ClassPage.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/debug",
        name: "Debug",
        component: () => import("./views/DebugPage.vue"),
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("./views/SettingsPage.vue"),
    },
    {
        path: "/scan/:id",
        name: "Scan",
        component: () => import("./views/ScanPage.vue"),
        meta: {
            fullscreen: true,
            invert: true,
            requiresAuth: true,
        },
    },
    {
        path: "/add/:id",
        name: "Manual Add",
        component: () => import("./views/AddPage.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/register",
        name: "Registration",
        component: () => import("./views/RegisterPage.vue"),
    },
    {
        path: "/login",
        name: "Login",
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
        store.commit("setHeaderText", to.name);
    });

    if (from.name == null) {
        // On first page load
        if (store.state.isLoggedIn) {
            store.dispatch("refreshSession").then(() => {
                if (to.matched.some((record) => record.meta.requiresAuth)) {
                    if (!store.state.isLoggedIn) {
                        next("/login");
                    } else {
                        next();
                    }
                } else {
                    next();
                }
            });
            return;
        }
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.state.isLoggedIn) {
            next("/login");
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
