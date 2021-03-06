import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'
import { store } from './store';

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://alexey/market.new/api/'
// Vue.http.options.root = 'http://dev.store.bubuka.info/api/'
// Vue.http.options.root = '/api/'

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective)

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

// Директива v-link вместо элемента router-link
Vue.directive('link', {
  // Когда привязанный элемент вставлен в DOM...
  bind: function (el, binding, vnode) {
    el.addEventListener('click', (e) => {
      linkAction(e, el)
    })
  },
  unbind: function (el, binding, vnode) {
    el.removeEventListener('click', (e) => {
      linkAction(e, el)
    })
  }
})

// переход по ссылке
function linkAction(e, item) {
  e.preventDefault()

  if (item.getAttribute('to')) {
    router.push(item.getAttribute('to')).catch((err) => {});
  } else {
    let path = item.getAttribute('href');

    if (router.currentRoute.path !== path) {
      router.push(path).catch((err) => {});
    }
  }
}

// прячем элементы при анимации смены страницы
router.beforeEach((to, from, next) => {
  let hideBeforeRouteElements = document.querySelectorAll('.hide-before-route')
  hideBeforeRouteElements.forEach(el => el.classList.add("hiddenForRoute"))
  setTimeout(()=>{
      hideBeforeRouteElements.forEach(el => el.classList.remove("hiddenForRoute"))
  },600)
  next();
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})