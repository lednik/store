import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'
import { store } from './store';

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://alexey/market.new/';

import Vuex from 'vuex'
Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
