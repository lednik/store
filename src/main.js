import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'
import { store } from './store';

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://alexey/market.new/api/'
// Vue.http.options.root = '/api/'

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective)

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

// Директива v-link вместо элемента router-link
Vue.directive('link', {
  // Когда привязанный элемент вставлен в DOM...
  bind: function (el, binding, vnode) {
    el.addEventListener('click', (e)=>{
      linkAction(e, el)
    })
  },
  unbind: function (el, binding, vnode) {
    el.removeEventListener('click', (e)=>{
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

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

router.beforeEach((to, from, next) => {    
  // window.removeEventListener('scroll', onScrollAnimate);
  let hideBeforeRouteElements = document.querySelectorAll('.hide-before-route')
  hideBeforeRouteElements.forEach(el => el.classList.add("hiddenForRoute"))
  setTimeout(()=>{
      hideBeforeRouteElements.forEach(el => el.classList.remove("hiddenForRoute"))
  },600)
  // linkRemoveActions();
  next();
})

// const handleClick = (e) => {
//   e.preventDefault();
//   // const ev = window.e || e;
//   const path = e.path || (e.composedPath && e.composedPath());
//   let link = e.target
//   path.some((item)=>{
//       if (item.classList&&item.classList.contains('js-router-link')) {
//           link = item;
//           return true
//       }
//       return false
//   })
//   linkAction(e, link)
// }

// router.afterEach((to, from) => {
//   // ...
//   setTimeout(() => {
//       onScrollAnimate();
//       window.addEventListener('scroll', onScrollAnimate);
//   }, 1100);
//   // ...
//   // Навешивание сбытий
//   setTimeout(() => {
//       linkAddActions()
//       window.content = undefined
//   }, 200);
//   setTimeout(() => {
//       store.commit('curtain/Show')
//   }, 600);
// })

// function linkAddActions(){
//   document.querySelectorAll('.js-router-link').forEach(item => {
//       item.addEventListener('click', handleClick);
//   });
// }

// function linkRemoveActions(){
//   document.querySelectorAll('.js-router-link').forEach(item => {
//       item.removeEventListener('click', handleClick);
//   });
// }


