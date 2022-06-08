import { createStore } from "vuex";
import router from "./router";

let store = createStore({
    state: {
        isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    },
    actions: {
        async login({ commit }, params) {
            console.log(params);
            await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: params.username,
                    password: params.password,
                }),
            });
            commit("setLoggedIn", true);
        },
        async logout({ commit }) {
            await fetch("/api/logout");
            commit("setLoggedIn", false);
            router.push("/login");
        },
        async refreshSession({ commit }) {
            try {
                let res = await fetch("/api/session");
                let body = await res.json();
                if (body.authenticated) {
                    commit("setLoggedIn", true);
                } else {
                    commit("setLoggedIn", false);
                }
            } catch (e) {
                commit("setLoggedIn", false);
            }
        },
    },
    mutations: {
        setLoggedIn(state, val) {
            if (typeof val == "boolean") {
                state.isLoggedIn = val;
                localStorage.setItem("isLoggedIn", val);
            }
        },
    },
});

export default store;
