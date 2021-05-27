import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://alexey/market.new/';

// let action = 'track/track/list_ajax';
// let method = 'post'
// // let formData = new FormData();
// request_data= {
//   pagination: {
//     page_size: 10,
//     order: 'rnd'
//   }
// }
// Vue.http[method]( action, request_data)
//     .then(response => response.json())
//     .then(data => {
//       this.setToken(data)
//       resolve()
//     }, data => {
//       console.log('notsuccess');
//       reject()
//     })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
