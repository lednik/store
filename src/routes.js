import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Index from '@pages/index.vue';
import Tariffs from '@pages/tariffs.vue';
import About from '@pages/about.vue';
import Contacts from '@pages/contacts.vue';
import catalog from '@pages/catalog.vue';
// import collection from '@pages/collection.vue';


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
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: catalog
    },
    // {
    //     path: '/collection/:id',
    //     name: 'collection',
    //     component: collection
    // }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});