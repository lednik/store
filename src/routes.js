import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Index from '@pages/index.vue';
import Tariffs from '@pages/tariffs.vue';
// import Delivery from '@pages/delivery/index.js';
// import Contacts from '@pages/contacts/index.js';
// import Card from '@pages/card/index.vue';
// import Profile from '@pages/profile/index.vue';
// import Feedback from '@pages/feedback/index.js';
// import E404 from '@pages/404/index.js';
// import E403 from '@pages/403/index.js';


const routes = [
    {
        path: '',
        name: 'main',
        component: Index
    },
    {
        path: '/tariffs',
        name: 'tariffs',
        component: Tariffs
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});