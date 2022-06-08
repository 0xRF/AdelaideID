import { createStore } from "vuex";
import router from "./router";

let store = createStore({
    state: {
        isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
        headerText: "",
    },
    actions: {
        async login({ commit }, params) {
            let res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: params.username,
                    password: params.password,
                }),
            });
            if (res.status != 200) {
                throw { name: "LoginError", message: "Failed to log in" };
            }
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
                if (res.status != 200) {
                    commit("setLoggedIn", false);
                } else {
                    let body = await res.json();
                    if (body.authenticated) {
                        commit("setLoggedIn", true);
                    } else {
                        commit("setLoggedIn", false);
                    }
                }
            } catch (e) {
                console.error(e);
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
        setHeaderText(state, val) {
            state.headerText = val;
        },
    },
});

export default store;
