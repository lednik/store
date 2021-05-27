import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

import modal from './modules/modal';
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
        modal,
        // registration
    },
    strict: process.env.NODE_ENV !== 'production',
});
  