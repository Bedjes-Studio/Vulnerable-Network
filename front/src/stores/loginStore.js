import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
    state: ()=>({ pseudo: "", token: "" }),
    getters: {
        isAuthenticated: (state) => state.token!="",
    }
});