import VueRouter from 'vue-router'

//Middleware
import middleware from './middleware'

//Import components
import index from './templates/index.vue'

import pageStart from './templates/pages/start.vue'

import errorIndex from './templates/error/index.vue'
import error404 from './templates/error/404.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: index, children: [
            { path: 'error', component: errorIndex, children: [
                { path: '404', component: error404, name: 'error.404' }
            ]},
            { path: '/', component: pageStart, name: 'page.start' }
        ], beforeEnter: middleware.invalidRoute }
    ]
})

export default router