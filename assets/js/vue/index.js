//Load store, router, translations and directives modules
import store from './store/index'
import router from './router'
import directives from './directives'

const app = new Vue({
    el: '#app',
    store,
    router
});