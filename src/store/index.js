import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

import modal from './modules/modal';
import playlist from './modules/playlist';
import auth from './modules/auth';
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
        playlist,
        auth
        // registration
    },
    strict: process.env.NODE_ENV !== 'production',
});
  