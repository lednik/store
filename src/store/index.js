import Vue from 'vue';
import Vuex from 'vuex';

// import curtain from './modules/curtain';
export const store = new Vuex.Store({
    state: {
        mobileState: false,
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        // curtain,
        // registration
    },
    strict: process.env.NODE_ENV !== 'production',
});
  