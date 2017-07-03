import VueRouter from 'vue-router'

//Middleware
import middleware from './middleware'

//Import components
import index from './templates/index.vue'

//pages
import pageStart from './templates/pages/start.vue'
import pageValidate from './templates/pages/validate.vue'
import pageAdmin from './templates/pages/admin.vue'

//Error pages
import errorIndex from './templates/error/index.vue'
import error404 from './templates/error/404.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: index, children: [
            { path: 'error', component: errorIndex, children: [
                { path: '404', component: error404, name: 'error.404' }
            ]},
            { path: '/', component: pageStart, name: 'page.start' },
            { path: '/validate', component: pageValidate, name: 'page.validate' },
            { path: '/admin', component: pageAdmin, name: 'page.admin' }
        //Each request will use the checkAuth and invalidRoute middleware
        ], beforeEnter: GuardsCheck([middleware.checkAuth, middleware.invalidRoute]) }
    ]
})

/*These two functions help nest multiple middleware. Got it from:
https://github.com/vuejs/vue-router/issues/721#issuecomment-252181948
with credit to Johanderson Mogollon (https://github.com/sonic182)
*/
function operate (guards, from, to, lastNext, i) {
    let guard = guards[i]
    if (guards.length === i + 1) {
        guard(from, to, lastNext)
    } else {
        guard(from, to, function (nextArg) {
            switch (typeof (nextArg)) {
                case 'undefined':
                    operate(guards, from, to, lastNext, i + 1)
                    break
                case 'object':
                    lastNext(nextArg)
                    break
                case 'boolean':
                    lastNext(nextArg)
                    break
                case 'string':
                    lastNext(nextArg)
                    break
            }
        })
    }
}
function GuardsCheck (ListOfGuards) {
    return function (from, to, next) {
        operate(ListOfGuards, from, to, next, 0)
    }
}

axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if(error.response.status == 401) {
        store.dispatch('logout')
        router.push({ name: 'home' })

    }
})

export default router